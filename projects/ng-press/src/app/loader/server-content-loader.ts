import {inject, Injectable, TransferState} from '@angular/core';
import {CONTENT_LOADER_KEY, ContentLoader, NG_PRESS_TOKEN} from 'ng-press-core';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';

@Injectable()
export class ServerContentLoader implements ContentLoader {
  private conf = inject(NG_PRESS_TOKEN);
  private state = inject(TransferState);

  async load(path?: string): Promise<string> {
    const fullPath = join(this.conf.local, path || 'index') + '.md';
    const text = await readFile(fullPath, 'utf-8');
    this.state.set(CONTENT_LOADER_KEY, text);
    console.log(fullPath);
    return text;
  }
}
