import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {routes} from './app.routes';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideShiki} from '@xprng/vendor';
import provideConfig from './services/provide-config';
import config from '../ngpress.config';

export default {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(withEventReplay()),

    // added
    provideHttpClient(withFetch()),

    // initialize async services
    provideConfig(config),

    // xprng modules
    provideShiki({
      langs: config.shiki.langs,
      themes: [config.shiki.theme],
    }),
  ]
} as ApplicationConfig;
