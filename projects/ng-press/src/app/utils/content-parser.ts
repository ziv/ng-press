import {Marked, type MarkedExtension, type Token} from 'marked';
import {codeToHtml} from 'shiki'
import {getHeadingList, gfmHeadingId, HeadingData} from 'marked-gfm-heading-id';
import {parse} from 'yaml';
import insane from 'insane';

export type FrontMatter = {
  data: Record<string, unknown>;
  markdown: string;
}

export type ParsedContent = {
  headings: HeadingData[];
  body: string;
  data: Record<string, unknown>;
};

/**
 * Naive front-matter parser.
 * @param content
 */
function frontMatter(content: string): FrontMatter {
  const fmRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+/;
  const match = content.match(fmRegex);

  if (match) {
    const yaml = match[1];
    const markdown = content.slice(match[0].length);
    const data = parse(yaml) || {};
    return {data, markdown};
  } else {
    return {data: {}, markdown: content};
  }
}

function markedShiki(): MarkedExtension {
  return {
    async: true,
    async walkTokens(t: Token) {
      if (t.type !== 'code') {
        return;
      }

      const theme = 'nord';
      const lang = t.lang ?? 'text';
      const html = await (codeToHtml(t.text, {lang, theme}) as Promise<string>);

      Object.assign(t, {
        type: 'html',
        block: true,
        text: `${html}\n`,
      });
    }
  }
}

const marked = new Marked().use(markedShiki()).use(gfmHeadingId());


/**
 * Content parser that extracts front-matter, converts markdown to HTML,
 * collects headings, and sanitizes the HTML.
 * @param content
 */
export async function contentParser(content: string): Promise<ParsedContent> {
  const {markdown, data} = frontMatter(content);
  const html = await marked.parse(markdown);
  const headings = getHeadingList();
  const sanitized = insane(html, {
    allowedAttributes: {
      // we allow href, name, target and rel on anchor tags
      a: ['href', 'name', 'target', 'rel'],
      // we allow style attributes on pre and span for shiki syntax highlighting
      pre: ['style'],
      span: ['style'],
      // we allow id attributes on headings for heading links
      h1: ['id'],
      h2: ['id'],
      h3: ['id'],
      h4: ['id'],
      h5: ['id'],
      h6: ['id'],
    }
  });
  return {headings, body: sanitized, data};
}
