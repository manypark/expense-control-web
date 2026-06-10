import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const userSessionCheckGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('accesToken');
  return !token ? router.createUrlTree(['/auth/sign-in']) : true;
};
