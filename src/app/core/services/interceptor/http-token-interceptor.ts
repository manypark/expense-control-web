import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, filter, finalize, switchMap, take, throwError } from 'rxjs';

import { BASE_URL } from '../../config/app-config';

interface RefreshTokenResponse {
  accessToken?: string;
  refreshToken?: string;
  token?: string;
}

let isRefreshingToken = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const http = inject(HttpClient);
  const router = inject(Router);
  const baseUrl = inject(BASE_URL);
  const token = localStorage.getItem('accesToken');

  const skipUrls = [ '/auth/login', '/auth/refresh' ];
  const isSkip = skipUrls.some((url) => req.url.includes(url));
  const authReq = (!isSkip && token) ? addTokenHeader(req, token) : req;

  return next(authReq).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && !isSkip) {
        return handle401Error(authReq, next, http, router, baseUrl);
      }

      return throwError(() => error);
    })
  );
}

function handle401Error(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  http: HttpClient,
  router: Router,
  baseUrl: string
): Observable<HttpEvent<unknown>> {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    redirectToLogin(router);
    return throwError(() => new Error('No refresh token found'));
  }

  if (isRefreshingToken) {
    return refreshTokenSubject.pipe(
      filter((token): token is string => token !== null),
      take(1),
      switchMap((newToken) => next(addTokenHeader(req, newToken)))
    );
  }

  isRefreshingToken = true;
  refreshTokenSubject.next(null);

  return http.post<RefreshTokenResponse>(`${baseUrl}/auth/refresh`, { refreshToken }).pipe(
    switchMap((response) => {
      const newAccessToken = response.accessToken ?? response.token;

      if (!newAccessToken) {
        redirectToLogin(router);
        return throwError(() => new Error('Refresh response does not include an access token'));
      }

      localStorage.setItem('accesToken', newAccessToken);

      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }

      refreshTokenSubject.next(newAccessToken);
      return next(addTokenHeader(req, newAccessToken));
    }),
    catchError((error) => {
      redirectToLogin(router);
      return throwError(() => error);
    }),
    finalize(() => {
      isRefreshingToken = false;
    })
  );
}

function addTokenHeader(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
}

function redirectToLogin(router: Router) {
  localStorage.removeItem('accesToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userLogued');
  router.navigate(['/auth/sign-in']);
}
