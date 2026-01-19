import {inject, Injectable} from '@angular/core';
import {ContentLoader} from './content-loader';
import {NG_PRESS_TOKEN} from 'ng-press-core';

@Injectable()
export class ClientContentLoader implements ContentLoader {
  private conf = inject(NG_PRESS_TOKEN);

  async load(path?: string): Promise<string> {
    const url = `${this.conf.base}${path || 'index'}.md`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('File not found');
    return res.text();
  }
}
