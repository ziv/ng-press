import {parse} from 'yaml'

export type FrontMatter = {
  data: Record<string, unknown>;
  markdown: string;
}

/**
 * Naive front-matter parser.
 * @param content
 */
export function frontMatter(content: string): FrontMatter {
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
