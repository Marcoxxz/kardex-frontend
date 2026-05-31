export interface Materia {
  sigla: string;
  nombre: string;
  creditos: number;
  carrera: string;
  semestre: number;
  requisito?: string;
  area?: string;
  activo: boolean;
}
