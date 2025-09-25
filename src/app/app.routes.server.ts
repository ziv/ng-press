import {RenderMode, ServerRoute} from '@angular/ssr';
import routes from './server-routes.json';

export const serverRoutes: ServerRoute[] = [

  {
    path: '**',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        {'**': 'index'},
        ...routes,
      ]
    }
  }
];
