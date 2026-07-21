import { provideRouter, withViewTransitions } from '@angular/router';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';

import { routes } from './app.routes';
import { SignInRepository } from './features/auth/signIn/domain';
import { authInterceptor } from './core/services/interceptor/http-token-interceptor';
import { ErrorInterceptor } from './core/services/interceptor/http-error-interceptor';
import { SignInRepositoryImpl } from './features/auth/signIn/infrastructure/repositories/sign-in-repository';
import { RecentTransactionFilterRepository } from './features/shared/components/common-table/domain/repositories';
import { RecentTransacionFilterRepositoryImpl } from './features/shared/components/common-table/infrastructure/repositories';
import { AccountsRepository, CardsRepository, ExpenseMonthlyRepository, RecentTransactionRepository } from './features/dashboard/domain/repositories';
import { AccountsRepositoryImpl, CardsRepositoryImpl, ExpenseMonthlyRepositoryImpl, RecentTransacionRepositoryImpl } from './features/dashboard/infrastructure/repositories';
import { ExpensesRepository } from './features/expenses/domain';
import { ExpensesRepositoryImpl } from './features/expenses/infrastructure/repositories';
import { BillsRepository } from './features/bills/domain';
import { BillsRepositoryImpl } from './features/bills/infrastructure/repositories';

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
    { provide: ExpensesRepository, useClass: ExpensesRepositoryImpl },
    { provide: BillsRepository, useClass: BillsRepositoryImpl },
    { provide: ExpenseMonthlyRepository, useClass: ExpenseMonthlyRepositoryImpl },
    { provide: RecentTransactionRepository, useClass: RecentTransacionRepositoryImpl },
    { provide: RecentTransactionFilterRepository, useClass: RecentTransacionFilterRepositoryImpl },
    {
      provide : HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi   : true
    }
  ],
};
