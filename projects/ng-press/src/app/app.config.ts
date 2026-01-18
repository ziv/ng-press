import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideNgPress} from 'ng-press-core';
import {Page, Home} from 'example';
import {provideClientHydration, withEventReplay, withHttpTransferCacheOptions} from '@angular/platform-browser';

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

    /**
     * Required since we're using `httpResource`
     */
    provideHttpClient(withFetch()),

    /**
     * NgPress Configuration
     */
    provideNgPress({
      base: 'https://raw.githubusercontent.com/ziv/ng-press/refs/heads/main/projects/ng-press/public/',
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
          tags: ['example'],
        }
      ]
    }),
  ]
};
