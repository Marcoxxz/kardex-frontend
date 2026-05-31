// kardex-response.ts
import { Nota } from './nota.model'; // ← IMPORTAR Nota

export interface KardexResponse {
  ru: string;
  nombreEstudiante: string;
  materias: Nota[]; // ← Ahora TypeScript sabe qué es Nota
  resumen: {
    totalCreditos: number;
    promedioPonderado: number;
    materiasAprobadas: number;
    materiasReprobadas: number;
    totalMaterias: number;
  };
}
