import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { of, switchMap } from 'rxjs';

export const memberGuard: CanActivateChildFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.currentUser$.pipe(
    switchMap(user => {
      if (user && user.role === 'member') {
        return of(true);
      } else {
        router.navigate(['/admin']);
        return of(false);
      }
    })
  );
};
