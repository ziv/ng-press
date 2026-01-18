import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideNgPress} from 'ng-press-core';
import {Page} from 'example';

export const appConfig: ApplicationConfig = {
  providers: [
    // we do not use hydration in this example
    // everything is rendered on the server side only
    // provideClientHydration(
    //   withEventReplay(),
    //   withHttpTransferCacheOptions({
    //     includePostRequests: true
    //   }),
    // ),
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
      },

      content: [
        {
          title: 'Welcome to NgPress',
          link: '',
        },
        {
          title: 'Getting Started',
          link: 'content/get-started',
          tags: ['loc:sidebar', 'sub:guides'],
        },
        {
          title: 'Installation Guide',
          link: 'content/installation',
          tags: ['loc:sidebar', 'sub:guides'],
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
