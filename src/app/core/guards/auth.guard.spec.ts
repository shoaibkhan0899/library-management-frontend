import { describe, it, expect, vi } from 'vitest';
import { canActivateAuth } from './auth.guard';

describe('authGuard', () => {
  it('blocks unauthenticated users from protected routes', () => {
    const navigate = vi.fn();

    const result = canActivateAuth(
      { isLoggedIn: () => false },
      { navigate },
    );

    expect(result).toBe(false);
    expect(navigate).toHaveBeenCalledWith(['/login']);
  });
});
