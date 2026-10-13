/** Formato uniforme con el que responde el backend: { code, status, data }. */
export interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}
