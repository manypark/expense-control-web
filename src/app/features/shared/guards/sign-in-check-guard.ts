import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const signInCheckGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('accesToken');
  return token ? router.createUrlTree(['/home/dashboard']) : true;
};
