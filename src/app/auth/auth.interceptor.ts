import { HttpRequest } from "@angular/common/http";
import { HttpHandlerFn } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { HttpEvent } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from "@angular/router";

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {

  const authService = inject(AuthService);
  const router = inject(Router)
  const cloned = req.clone({ withCredentials: true });


  return next(cloned).pipe(

    catchError((error) => {

      if (error.status === 403) {

        return authService.refreshToken().pipe(

          switchMap(() => {
            
            const retryReq = req.clone({ withCredentials: true });
            return next(retryReq);
          }),

          catchError(err => {
            
             router.navigate(['/login']);
            return throwError(() => err);
          })

        );
      }

      return throwError(() => error);
    })
  );
}
