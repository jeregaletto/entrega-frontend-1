import { Rol } from './rol.model';

/** Datos del usuario que devuelve POST /auth/login y se guardan en la sesión. */
export interface UsuarioSesion {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: Rol;
  id_sede: number | null;
}

export interface LoginRequest {
  dni: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  usuario: UsuarioSesion;
}

export interface RegistroRequest {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  password: string;
  fecha_nacimiento: string; // YYYY-MM-DD
  telefono?: string | null;
  id_cobertura: number;
}

export interface UsuarioRegistrado {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  rol: Rol;
}

/** Respuesta de GET /auth/perfil. */
export interface Perfil {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  fecha_nacimiento: string | null;
  telefono: string | null;
  rol: Rol;
  id_sede: number | null;
  id_cobertura: number | null;
  cobertura_nombre: string | null;
}
