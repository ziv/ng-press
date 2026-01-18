import {RenderMode, ServerRoute} from '@angular/ssr';
import {injectNgPress} from 'ng-press-core';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return injectNgPress().content.map(i => ({'**': i.link}));
    }
  }
];
