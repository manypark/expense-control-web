import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter, withViewTransitions } from '@angular/router';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';

import { routes } from './app.routes';
import { ErrorInterceptor } from './core/services/interceptor/http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter( routes, withViewTransitions() ),
    provideTanStackQuery( new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnWindowFocus: false,
        },
      }
    }) ),
    {
      provide : HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi   : true
    }
  ],
};