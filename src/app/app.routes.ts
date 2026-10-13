import { Route, Routes } from '@angular/router';
import { MENU_POR_ROL } from './core/config/menu.config';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { rolGuard } from './core/guards/rol.guard';
import { ROLES, Rol } from './core/models/rol.model';
import { Home } from './pages/home/home';

/** Sección de rutas de un rol (/admin/..., /medico/..., etc.), protegida por sesión y por rol. */
function seccionDeRol(rol: Rol): Route {
  const items = MENU_POR_ROL[rol];
  return {
    path: rol,
    canActivate: [authGuard, rolGuard(rol)],
    canActivateChild: [authGuard, rolGuard(rol)],
    children: [
      { path: '', pathMatch: 'full', redirectTo: items[0].path },
      ...items.map((item) => ({
        path: item.path,
        title: item.label,
        data: { titulo: item.label },
        loadComponent: () => import('./pages/en-construccion/en-construccion').then((m) => m.EnConstruccion),
      })),
    ],
  };
}

export const routes: Routes = [
  { path: '', component: Home, title: 'Inicio' },
  {
    path: 'login',
    title: 'Iniciar sesión',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'registro',
    title: 'Registro de paciente',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/registro/registro').then((m) => m.Registro),
  },
  {
    path: 'perfil',
    title: 'Mi perfil',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/perfil/perfil').then((m) => m.Perfil),
  },
  ...ROLES.map(seccionDeRol),
  {
    path: 'acceso-denegado',
    title: 'Acceso denegado',
    loadComponent: () => import('./pages/acceso-denegado/acceso-denegado').then((m) => m.AccesoDenegado),
  },
  {
    path: '**',
    title: 'Página no encontrada',
    loadComponent: () => import('./pages/no-encontrada/no-encontrada').then((m) => m.NoEncontrada),
  },
];
