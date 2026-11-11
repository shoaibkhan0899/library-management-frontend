import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['role'] as UserRole | undefined;
  const actualRole = authService.getUserRole();

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  if (expectedRole && actualRole !== expectedRole) {
    const fallbackRoute = actualRole === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard';
    router.navigate([fallbackRoute]);
    return false;
  }

  return true;
};
