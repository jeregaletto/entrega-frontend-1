import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';

/** Obtiene un mensaje legible para el usuario a partir de un error HTTP del backend. */
export function mensajeDeError(
  err: unknown,
  porDefecto = 'Ocurrió un error inesperado. Intentá nuevamente.',
): string {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 0) {
      return 'No se pudo conectar con el servidor. Verificá que el backend esté en ejecución.';
    }
    const body = err.error as Partial<ApiResponse<unknown>> | null;
    if (body && typeof body.status === 'string' && body.status.trim()) {
      return body.status;
    }
  }
  return porDefecto;
}
