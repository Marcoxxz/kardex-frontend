export interface Nota {
  id: number;
  ru: string;
  siglaMateria: string;
  nombreMateria: string;
  notaFinal: number;
  gestion: string;
  creditos: number; // ← AGREGAR ESTO
}
