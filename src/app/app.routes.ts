import { Routes } from '@angular/router';

import { signInCheckGuard, userSessionCheckGuard } from './features/shared';

export const routes: Routes = [
    // Rutas de autenticación
    {
        path            : 'auth/sign-in',
        loadComponent   : () => import('./features/auth/signIn/presentation/pages/signIn/signIn'),
        title           : 'Inicio de sesión',
        canActivate     : [signInCheckGuard]
    },
    {
        path            : 'auth/sign-up',
        loadComponent   : () => import('./features/auth/signUp/presentation/pages/signUp/signUp'),
        title           : 'Registro',
        canActivate     : [signInCheckGuard]
    },
    {
        path: 'home',
        loadComponent: () => import('./features/shared/components/bottom-navigation/bottom-nagivation/bottom-nagivation'),
        title: 'Inicio',
        canActivate : [userSessionCheckGuard],
        children    : [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/presentation/pages/dashboard/dashboard'),
                title: 'Panel principal',
                canActivate : [userSessionCheckGuard]
            },
            {
                path: 'expenses',
                loadComponent: () => import('./features/expenses/presentation/pages/expenses/expenses'),
                title: 'Gastos',
                canActivate : [userSessionCheckGuard]
            },
            {
                path: 'services',
                loadComponent: () => import('./features/bills/presentation/pages/bills/bills'),
                title: 'Servicios',
                canActivate : [userSessionCheckGuard]
            },
            {
                path: 'analitycs',
                loadComponent: () => import('./features/analytics/presentation/pages/analytics/analytics'),
                title: 'Analitica',
                canActivate : [userSessionCheckGuard]
            },
            {
                path: 'cards',
                loadComponent: () => import('./features/cards/presentation/pages/credit-cards/credit-cards'),
                title: 'Tarjetas',
                canActivate : [userSessionCheckGuard]
            },
            {
                path: '**',
                redirectTo: 'home',
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/sign-in',
    },
];