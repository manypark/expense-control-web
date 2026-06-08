import { provideRouter } from '@angular/router';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(routes),
    provideTanStackQuery( new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnWindowFocus: false,
        },
      }
    }) ),
  ],
};