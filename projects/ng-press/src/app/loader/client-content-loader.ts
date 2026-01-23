import {inject, Injectable, TransferState} from '@angular/core';
import {CONTENT_LOADER_KEY, ContentLoader, NG_PRESS_TOKEN} from 'ng-press-core';

@Injectable()
export class ClientContentLoader implements ContentLoader {
  private conf = inject(NG_PRESS_TOKEN);
  private state = inject(TransferState);

  async load(path?: string): Promise<string> {
    if (this.state.hasKey(CONTENT_LOADER_KEY)) {
      return this.state.get(CONTENT_LOADER_KEY, '');
    }
    const url = `${this.conf.base}${path || 'index'}.md`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('File not found');
    return res.text();
  }
}
