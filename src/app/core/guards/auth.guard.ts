import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export function canActivateAuth(
  authService: Pick<AuthService, 'isLoggedIn'>,
  router: Pick<Router, 'navigate'>,
): boolean {
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
}

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return canActivateAuth(authService, router);
};