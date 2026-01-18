import {getHeadingList, gfmHeadingId} from 'marked-gfm-heading-id';
import {markedShiki} from './shiki';
import {marked} from 'marked';
import insane from 'insane';

export function parseMarkdown(md: string) {
  const html = marked.use(markedShiki(), gfmHeadingId()).parse(md) as string;

  // the Angular sanitizer is not configurable enough for our needs
  // so we use sanitize-html instead
  return {
    heading: getHeadingList(),
    sanitized: insane(html, {
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
    })
  };
}
