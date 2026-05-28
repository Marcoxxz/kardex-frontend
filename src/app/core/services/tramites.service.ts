import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tramite } from '../models/tramite.model';
import { Estudiante } from '../models/estudiante.model';

@Injectable({
  providedIn: 'root',
})
export class TramitesService {
  private apiUrl = 'http://localhost:8080/api/v1/tramites';

  constructor(private http: HttpClient) {}

  crearTramite(tramite: Tramite): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/crear`, tramite);
  }

  auditarTramite(id: number): Observable<Estudiante[]> {
    // Vulnerable a SQL Injection de Segundo Orden
    return this.http.get<Estudiante[]>(`${this.apiUrl}/auditar/${id}`);
  }
}
