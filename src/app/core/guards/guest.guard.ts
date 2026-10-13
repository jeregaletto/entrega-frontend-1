import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Para login y registro: si ya hay sesión, vuelve a la pantalla principal. */
export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.estaLogueado() ? inject(Router).createUrlTree(['/']) : true;
};
