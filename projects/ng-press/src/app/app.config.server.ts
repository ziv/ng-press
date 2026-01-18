import {mergeApplicationConfig, ApplicationConfig} from '@angular/core';
import {provideServerRendering, withRoutes} from '@angular/ssr';
import {appConfig} from './app.config';
import {serverRoutes} from './app.routes.server';
import {CONTENT_LOADER} from './loader/content-loader';
import {ServerContentLoader} from './loader/server-content-loader';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    {
      provide: CONTENT_LOADER,
      useClass: ServerContentLoader,
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
