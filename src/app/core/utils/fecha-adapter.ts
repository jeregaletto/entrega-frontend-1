import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

/** Adaptador de fechas que además interpreta lo tipeado en formato dd/mm/aaaa. */
@Injectable()
export class FechaAdapter extends NativeDateAdapter {
  override parse(value: unknown, parseFormat?: unknown): Date | null {
    if (typeof value === 'string') {
      const match = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (match) {
        const [, d, m, a] = match.map(Number);
        const fecha = new Date(a, m - 1, d);
        const valida = fecha.getFullYear() === a && fecha.getMonth() === m - 1 && fecha.getDate() === d;
        return valida ? fecha : this.invalid();
      }
    }
    return super.parse(value, parseFormat);
  }
}

/** Convierte una fecha a YYYY-MM-DD (formato que espera el backend). */
export function aFechaIso(fecha: Date): string {
  const mm = String(fecha.getMonth() + 1).padStart(2, '0');
  const dd = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mm}-${dd}`;
}
