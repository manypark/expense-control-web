import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter, withViewTransitions } from '@angular/router';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';

import { routes } from './app.routes';
import { SignInRepository } from './features/auth/signIn/domain';
import { ErrorInterceptor } from './core/services/interceptor/http-interceptor';
import { SignInRepositoryImpl } from './features/auth/signIn/infrastructure/repositories/sign-in-repository';

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
    { provide: SignInRepository, useClass: SignInRepositoryImpl },
    {
      provide : HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi   : true
    }
  ],
};