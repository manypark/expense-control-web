import { provideRouter, withViewTransitions } from '@angular/router';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';

import { routes } from './app.routes';
import { SignInRepository } from './features/auth/signIn/domain';
import { ErrorInterceptor } from './core/services/interceptor/http-error-interceptor';
import { authInterceptor } from './core/services/interceptor/http-token-interceptor';
import { AccountsRepository, CardsRepository } from './features/dashboard/domain/repositories';
import { SignInRepositoryImpl } from './features/auth/signIn/infrastructure/repositories/sign-in-repository';
import { AccountsRepositoryImpl, CardsRepositoryImpl } from './features/dashboard/infrastructure/repositories';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter( routes, withViewTransitions() ),
    provideHttpClient( withInterceptors([authInterceptor]), ),
    provideTanStackQuery( new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnWindowFocus: false,
        },
      }
    }) ),
    { provide: CardsRepository, useClass: CardsRepositoryImpl },
    { provide: SignInRepository, useClass: SignInRepositoryImpl },
    { provide: AccountsRepository, useClass: AccountsRepositoryImpl },
    {
      provide : HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi   : true
    }
  ],
};