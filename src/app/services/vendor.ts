import {Injectable} from '@angular/core';
import {createHighlighter} from 'shiki';
import {Marked} from 'marked';
import markedShiki from 'marked-shiki';

@Injectable({providedIn: 'root'})
export class Vendor {
  highlighter?: Awaited<ReturnType<typeof createHighlighter>>;
  marked?: Marked;

  // called during app initialization
  async load(langs: string[], theme: string) {
    const highlighter = await createHighlighter({
      langs,
      themes: [theme],
    });
    this.highlighter = highlighter;
    this.marked = new Marked();
    this.marked.use(markedShiki({
      highlight(code, lang) {
        return highlighter.codeToHtml(code, {lang, theme})
      }
    }));
  }
}
