import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nota } from '../models/nota.model';
import { environment } from '../../../environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class NotasService {
  private apiUrl = `${environment.apiUrl}/api/v1/notas`;

  constructor(private http: HttpClient) {}

  // Ya lo tienes - Vulnerable a IDOR
  consultarNotaPorId(id: number): Observable<Nota> {
    return this.http.get<Nota>(`${this.apiUrl}/consultar/${id}`);
  }

  // 🔥 NUEVO - Obtener todas las notas de un estudiante
  getNotasByEstudiante(ru: string): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.apiUrl}/estudiante/${ru}`);
  }

  // 🔥 NUEVO - Obtener kardex completo
  getKardexCompleto(ru: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kardex/${ru}`);
  }

  // 🔥 NUEVO - Registrar nueva nota
  registrarNota(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(`${this.apiUrl}/registrar`, nota);
  }

  // 🔥 NUEVO - Actualizar nota
  actualizarNota(id: number, nota: Nota): Observable<Nota> {
    return this.http.put<Nota>(`${this.apiUrl}/actualizar/${id}`, nota);
  }
}
