import { Routes } from '@angular/router';

export const routes: Routes = [
    // Rutas de autenticación
    {
        path: 'auth/sign-in',
        loadComponent: () => import('./features/auth/signIn/presentation/pages/signIn/signIn'),
        title: 'Inicio de sesión',
    },
    {
        path: 'auth/sign-up',
        loadComponent: () => import('./features/auth/signUp/presentation/pages/signUp/signUp'),
        title: 'Registro',
    },
    {
        path: 'home',
        loadComponent: () => import('./features/dashboard/presentation/pages/dashboard/dashboard'),
        title: 'Inicio',
    },
    {
        path: 'expenses',
        loadComponent: () => import('./features/expenses/presentation/pages/expenses/expenses'),
        title: 'Gastos',
    },
    {
        path: 'services',
        loadComponent: () => import('./features/bills/presentation/pages/bills/bills'),
        title: 'Servicios',
    },
    {
        path: 'analitycs',
        loadComponent: () => import('./features/analytics/presentation/pages/analytics/analytics'),
        title: 'Analitica',
    },
    {
        path: 'cards',
        loadComponent: () => import('./features/cards/presentation/pages/credit-cards/credit-cards'),
        title: 'Tarjetas',
    },
    {
        path: '**',
        redirectTo: 'auth/sign-in',
    },
];