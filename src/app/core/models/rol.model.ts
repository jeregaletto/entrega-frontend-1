export type Rol = 'admin' | 'medico' | 'operador' | 'paciente';

export const ROLES: Rol[] = ['admin', 'medico', 'operador', 'paciente'];

export const ROL_LABEL: Record<Rol, string> = {
  admin: 'Administrador',
  medico: 'Médico',
  operador: 'Operador',
  paciente: 'Paciente',
};
