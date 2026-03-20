import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth/auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isLoggedIn();
};
