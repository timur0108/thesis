import { HttpRequest } from "@angular/common/http";
import { HttpHandlerFn } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpEvent } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";

export function authInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
    const authService = inject(AuthService);
    if (authService._authenticatedUser !== null) {
        const cloned = req.clone({ withCredentials: true });
        return next(cloned);
    }
    
    return next(req);
}
