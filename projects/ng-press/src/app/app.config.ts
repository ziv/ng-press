import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';
import {provideClientHydration, withEventReplay, withHttpTransferCacheOptions} from '@angular/platform-browser';
import {provideNgPress} from 'ng-press-core';
import {Home, Page} from 'example';
import {CONTENT_LOADER} from './loader/content-loader';
import {ClientContentLoader} from './loader/client-content-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(
      withEventReplay(),
      withHttpTransferCacheOptions({
        includePostRequests: true
      }),
    ),
    provideBrowserGlobalErrorListeners(),
    /**
     * We have a single route that loads everything dynamically
     * The view transitions make route changes smoother
     */
    provideRouter([
        {
          path: '**',
          loadComponent: () => import('./renderer'),
        }
      ],
      withViewTransitions(),
    ),
    {
      provide: CONTENT_LOADER,
      useClass: ClientContentLoader
    },
    /**
     * NgPress Configuration
     */
    provideNgPress({
      base: '',
      local: './projects/ng-press/public/',

      name: 'Demo NgPress',
      title: 'NgPress Demo',

      components: {
        page: Page,
        home: Home,
      },

      content: [
        {
          title: 'Home',
          link: '',
          tags: ['loc:topbar'],
        },
        {
          title: 'About NgPress',
          link: 'about',
          tags: ['loc:topbar'],
        },
        {
          title: 'Getting Started',
          link: 'content/get-started',
          tags: ['loc:sidebar'],
        },
        {
          title: 'Installation Guide',
          link: 'content/installation',
          tags: ['loc:sidebar'],
        },
        {
          title: 'Example',
          link: 'example',
          tags: ['loc:sidebar'],
        }
      ]
    }),
  ]
};
