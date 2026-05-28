import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante.model';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private apiUrl = 'http://localhost:8080/api/v1/estudiantes';

  constructor(private http: HttpClient) {}

  buscarPorCi(ci: string): Observable<Estudiante[]> {
    console.log('🔍 Búsqueda vulnerable SQL');
    return this.http.get<Estudiante[]>(`${this.apiUrl}/buscar?ci=${ci}`);
  }
}
