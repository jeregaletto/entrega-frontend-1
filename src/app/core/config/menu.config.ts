import { Rol } from '../models/rol.model';

export interface MenuItem {
  label: string;
  icon: string;
  /** Ruta relativa dentro de la sección del rol (/<rol>/<path>). */
  path: string;
}

/**
 * Opciones del menú de cada rol. A partir de esta configuración se generan
 * tanto el menú lateral como las rutas de cada sección (ver app.routes.ts).
 * Las funcionalidades de semanas futuras apuntan por ahora a "En construcción".
 */
export const MENU_POR_ROL: Record<Rol, MenuItem[]> = {
  paciente: [
    { label: 'Solicitar turno', icon: 'event_available', path: 'solicitar-turno' },
    { label: 'Mis turnos', icon: 'event_note', path: 'mis-turnos' },
    { label: 'Mi historia clínica', icon: 'folder_shared', path: 'historia-clinica' },
  ],
  medico: [
    { label: 'Mi agenda', icon: 'calendar_month', path: 'agenda' },
    { label: 'Turnos del día', icon: 'today', path: 'turnos' },
    { label: 'Historias clínicas', icon: 'folder_shared', path: 'historias-clinicas' },
  ],
  operador: [
    { label: 'Gestión de turnos', icon: 'event_note', path: 'turnos' },
    { label: 'Agendas médicas', icon: 'calendar_month', path: 'agendas' },
    { label: 'Pacientes', icon: 'groups', path: 'pacientes' },
  ],
  admin: [
    { label: 'Sedes', icon: 'apartment', path: 'sedes' },
    { label: 'Especialidades', icon: 'medical_services', path: 'especialidades' },
    { label: 'Coberturas', icon: 'health_and_safety', path: 'coberturas' },
    { label: 'Usuarios', icon: 'manage_accounts', path: 'usuarios' },
    { label: 'Auditoría', icon: 'policy', path: 'auditoria' },
    { label: 'Reportes', icon: 'bar_chart', path: 'reportes' },
  ],
};
