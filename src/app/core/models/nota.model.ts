export interface Nota {
  id: number;
  ru: string;
  siglaMateria: string; // ← Cambiado: sin guión bajo
  nombreMateria: string; // ← Cambiado: sin guión bajo
  notaFinal: number; // ← Cambiado: sin guión bajo
  gestion: string;
}
