import {inject, Injectable, TransferState} from '@angular/core';
import {
  contentParser,
  CONTENT_LOADER_KEY,
  ContentLoader,
  NG_PRESS_TOKEN,
  type ParsedContent,
  type NgPressConfig
} from 'ng-press-core'

@Injectable()
export class ClientContentLoader implements ContentLoader {
  private conf = inject<NgPressConfig>(NG_PRESS_TOKEN);
  private state = inject(TransferState);

  async load(path?: string): Promise<ParsedContent> {
    if (this.state.hasKey(CONTENT_LOADER_KEY)) {
      return this.state.get(CONTENT_LOADER_KEY, {body: '', headings: [], data: {}});
    }
    const url = `${this.conf.base}${path || 'index'}.md`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('File not found');
    const text = await res.text();
    return contentParser(text);
  }
}
