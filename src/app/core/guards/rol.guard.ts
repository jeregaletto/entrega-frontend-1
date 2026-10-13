import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Rol } from '../models/rol.model';
import { AuthService } from '../services/auth.service';

/** Solo deja pasar a los roles indicados; el resto va a "Acceso denegado". */
export const rolGuard =
  (...roles: Rol[]): CanActivateFn =>
  () => {
    const rol = inject(AuthService).rol();
    return rol && roles.includes(rol) ? true : inject(Router).createUrlTree(['/acceso-denegado']);
  };
