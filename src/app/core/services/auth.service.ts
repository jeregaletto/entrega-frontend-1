import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import {
  LoginRequest,
  LoginResponse,
  Perfil,
  RegistroRequest,
  UsuarioRegistrado,
  UsuarioSesion,
} from '../models/usuario.model';

const TOKEN_KEY = 'clinica.token';
const USUARIO_KEY = 'clinica.usuario';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/auth`;

  private readonly _usuario = signal<UsuarioSesion | null>(this.restaurarSesion());

  readonly usuario = this._usuario.asReadonly();
  readonly estaLogueado = computed(() => this._usuario() !== null);
  readonly rol = computed(() => this._usuario()?.rol ?? null);

  login(credenciales: LoginRequest): Observable<UsuarioSesion> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.url}/login`, credenciales).pipe(
      tap(({ data }) => {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USUARIO_KEY, JSON.stringify(data.usuario));
        this._usuario.set(data.usuario);
      }),
      map(({ data }) => data.usuario),
    );
  }

  registro(datos: RegistroRequest): Observable<UsuarioRegistrado> {
    return this.http
      .post<ApiResponse<UsuarioRegistrado>>(`${this.url}/registro`, datos)
      .pipe(map(({ data }) => data));
  }

  getPerfil(): Observable<Perfil> {
    return this.http.get<ApiResponse<Perfil>>(`${this.url}/perfil`).pipe(map(({ data }) => data));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USUARIO_KEY);
    this._usuario.set(null);
  }

  /** Devuelve el token vigente; si venció, cierra la sesión y devuelve null. */
  getToken(): string | null {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && tokenVencido(token)) {
      this.logout();
      return null;
    }
    return token;
  }

  private restaurarSesion(): UsuarioSesion | null {
    const token = localStorage.getItem(TOKEN_KEY);
    const usuario = localStorage.getItem(USUARIO_KEY);
    if (!token || !usuario || tokenVencido(token)) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USUARIO_KEY);
      return null;
    }
    try {
      return JSON.parse(usuario) as UsuarioSesion;
    } catch {
      return null;
    }
  }
}

/** Lee el campo `exp` del JWT (sin validar la firma, eso lo hace el backend). */
function tokenVencido(token: string): boolean {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const { exp } = JSON.parse(atob(payload)) as { exp?: number };
    return exp !== undefined && exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}
