import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateChildFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.currentUser$.pipe(
    switchMap(user => {
      if (user) {
        return of(true);
      } else {
        router.navigate(['/login']);
        return of(false);
      }
    })
  );
};
