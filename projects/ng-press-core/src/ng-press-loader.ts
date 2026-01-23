import {InjectionToken, makeStateKey} from '@angular/core';
import type {ParsedContent} from './utils/content-parser';

export interface ContentLoader {
  load(path?: string): Promise<ParsedContent>;
}

export const CONTENT_LOADER = new InjectionToken<ContentLoader>('CONTENT_LOADER');
export const CONTENT_LOADER_KEY = makeStateKey<ParsedContent>('CONTENT_LOADER_KEY');
