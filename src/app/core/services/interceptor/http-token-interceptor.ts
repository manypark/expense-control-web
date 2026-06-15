import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { HttpClientService } from '../http/http-services-impl';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const http = inject(HttpClientService);
  
  const router = inject(Router);

  const token = localStorage.getItem('accesToken');

  // Rutas donde no queremos agregar el token
  const skipUrls = [ '/auth/login', '/auth/refreshToken' ];

  const isSkip = skipUrls.some(u => req.url.includes(u));

  // Clonar el request sólo si tenemos token y no es ruta ignorada
  const authReq = (!isSkip && token) ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse && err.status === 401 && !req.url.includes('/auth/refreshToken')) {
        // Intentar refresh token
        // return handle401Error(authReq, next, http, router);
      }
      // Si no es 401 o es la ruta de refresh ya, simplemente propaga el error
      return throwError(() => err);
    })
  );
};

// function handle401Error(
//   req: HttpRequest<unknown>,
//   next: HttpHandlerFn,
//   http: HttpClientService,
//   router: Router
// ): Observable<HttpEvent<unknown>> {
//   const currentToken = localStorage.getItem('token');
//   if (!currentToken) {
//     redirectToLogin(router);
//     return throwError(() => new Error('No token to refresh'));
//   }

//   // Llamada para refrescar token
//   return http.post<{ token: string }>('/auth/refreshToken', { token: currentToken }).pipe(
//     switchMap(response => {
//       const newToken = response.token;
//       // actualizar localStorage
//       localStorage.setItem('token', newToken);

//       // reintentar la petición original con el nuevo token
//       const retryReq = req.clone({
//         setHeaders: { Authorization: `Bearer ${newToken}` },
//       });
//       return next(retryReq);
//     }),
//     catchError(err2 => {
//       // Si el refresh falla, redirigir
//       redirectToLogin(router);
//       return throwError(() => err2);
//     })
//   );
// }

// function redirectToLogin(router: Router) {
//   localStorage.removeItem('token');
//   router.navigate(['/auth/login']);
// }