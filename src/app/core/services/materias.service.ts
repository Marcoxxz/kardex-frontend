// src/app/core/services/materias.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materia } from '../models/materia.model';
import { environment } from '../../../environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private apiUrl = `${environment.apiUrl}/api/v1/materias`;

  constructor(private http: HttpClient) {}

  // Obtener todas las materias
  getAllMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(this.apiUrl);
  }

  // Obtener materias activas
  getMateriasActivas(): Observable<Materia[]> {
    return this.http.get<Materia[]>(`${this.apiUrl}/activas`);
  }

  // Obtener materia por sigla
  getMateriaBySigla(sigla: string): Observable<Materia> {
    return this.http.get<Materia>(`${this.apiUrl}/${sigla}`);
  }

  // Buscar materias por carrera
  getMateriasByCarrera(carrera: string): Observable<Materia[]> {
    return this.http.get<Materia[]>(`${this.apiUrl}/carrera/${carrera}`);
  }

  // Buscar materias por semestre
  getMateriasBySemestre(semestre: number): Observable<Materia[]> {
    return this.http.get<Materia[]>(`${this.apiUrl}/semestre/${semestre}`);
  }

  // Buscar materias por término
  searchMaterias(term: string): Observable<Materia[]> {
    return this.http.get<Materia[]>(`${this.apiUrl}/buscar?term=${term}`);
  }

  // Crear nueva materia
  createMateria(materia: Materia): Observable<Materia> {
    return this.http.post<Materia>(this.apiUrl, materia);
  }

  // Actualizar materia
  updateMateria(sigla: string, materia: Materia): Observable<Materia> {
    return this.http.put<Materia>(`${this.apiUrl}/${sigla}`, materia);
  }

  // Eliminar materia
  deleteMateria(sigla: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${sigla}`);
  }

  // Desactivar materia (soft delete)
  desactivarMateria(sigla: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${sigla}/desactivar`, {});
  }

  // Activar materia
  activarMateria(sigla: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${sigla}/activar`, {});
  }
}
