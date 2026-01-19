import { InjectionToken } from '@angular/core';

export interface ContentLoader {
  load(path?: string): Promise<string>;
}

export const CONTENT_LOADER = new InjectionToken<ContentLoader>('CONTENT_LOADER');
