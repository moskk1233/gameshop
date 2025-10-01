import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of, switchMap } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.currentUser$.pipe(
    switchMap((user) => {
      if (user && user.role === 'admin') {
        return of(true);
      } else {
        router.navigate(['/']);
        return of(false);
      }
    }),
  );
};
