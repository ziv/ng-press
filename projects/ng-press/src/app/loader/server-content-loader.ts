import {inject, Injectable} from '@angular/core';
import {ContentLoader} from './content-loader';
import {readFileSync} from 'node:fs'; // It is safe to import here!
import {join} from 'node:path';
import {NG_PRESS_TOKEN} from 'ng-press-core'; // Your config

@Injectable()
export class ServerContentLoaderService implements ContentLoader {
  private conf = inject(NG_PRESS_TOKEN);

  async load(path: string): Promise<string> {
    // Logic to read from disk
    const fullPath = join(this.conf.local, path || 'index') + '.md';
    return readFileSync(fullPath, 'utf-8');
  }
}
