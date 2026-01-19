import {inject, Injectable} from '@angular/core';
import {ContentLoader} from './content-loader';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {NG_PRESS_TOKEN} from 'ng-press-core';

@Injectable()
export class ServerContentLoader implements ContentLoader {
  private conf = inject(NG_PRESS_TOKEN);

  async load(path?: string): Promise<string> {
    const fullPath = join(this.conf.local, path || 'index') + '.md';
    return readFile(fullPath, 'utf-8');
  }
}
