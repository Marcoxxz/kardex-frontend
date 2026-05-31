export interface Tramite {
  id?: number;
  ru: string; // ← Falta este campo
  codigoSeguridad: string;
  descripcion: string;
  // estado NO existe en backend
}
