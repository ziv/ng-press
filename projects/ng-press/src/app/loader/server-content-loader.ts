import {inject, Injectable, TransferState} from '@angular/core';
import {
  contentParser,
  CONTENT_LOADER_KEY,
  ContentLoader,
  NG_PRESS_TOKEN,
  type ParsedContent,
  type NgPressConfig
} from 'ng-press-core';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';

@Injectable()
export class ServerContentLoader implements ContentLoader {
  private conf = inject<NgPressConfig>(NG_PRESS_TOKEN);
  private state = inject(TransferState);

  async load(path?: string): Promise<ParsedContent> {
    const fullPath = join(this.conf.local, path || 'index') + '.md';
    const text = await readFile(fullPath, 'utf-8');
    const res = await contentParser(text);
    this.state.set(CONTENT_LOADER_KEY, res);
    return res;
  }
}
