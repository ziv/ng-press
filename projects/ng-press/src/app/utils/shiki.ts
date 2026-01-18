import js from '@shikijs/langs/javascript'
import ts from '@shikijs/langs/ts'
import nord from '@shikijs/themes/nord'
import {createHighlighterCoreSync} from 'shiki/core'
import {createJavaScriptRegexEngine} from 'shiki/engine/javascript'
import type {MarkedExtension, Token} from 'marked';

// we build a custom shiki highlighter with only the languages and themes we need
// to keep the bundle size small and to create a synchronous highlighter
const shiki = createHighlighterCoreSync({
  themes: [nord],
  langs: [js, ts],
  engine: createJavaScriptRegexEngine()
})

export function markedShiki(): MarkedExtension {
  return {
    async: false,
    walkTokens(t: Token) {
      if (t.type !== 'code') {
        return;
      }

      const [lang = 'text', ...props] = t.lang?.split(' ') ?? []

      const html = shiki.codeToHtml(
        t.text,
        {lang, theme: 'nord'},
      );

      Object.assign(t, {
        type: 'html',
        block: true,
        text: `${html}\n`,
      });
    }
  }
}
