import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.waitForAuthInit().pipe(
    map(user => {
      if (user && user.role === 'admin') {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  )
};
