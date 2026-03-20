import { HttpRequest } from "@angular/common/http";
import { HttpHandlerFn } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { HttpEvent } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { NgZone } from "@angular/core";

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {

  const authService = inject(AuthService);
  const router = inject(Router);
  const zone = inject(NgZone);

  if (req.url.includes('/auth/refresh')) {
    return next(req);
  }

  const cloned = req.clone({ withCredentials: true });

  return next(cloned).pipe(

    catchError((error) => {

      if (error.status === 401 || error.status === 403) {

        return authService.refreshToken().pipe(

          switchMap(() => {
            return next(cloned);
          }),

          catchError(err => {
            zone.run(() => {
              router.navigate(['/login']);
            });
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
}
