import { Service } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";

@Service()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        switch (error.status) {

          case 401:
            console.error('Unauthorized');
            break;

          case 403:
            console.error('Forbidden');
            break;

          case 500:
            console.error('Server Error');
            break;

          case 0:
            console.error('Network Error');
            break;
        }

        return throwError( () => new Error( error.error?.message ?? 'Unexpected error' ) );
      })
    );
  }
}