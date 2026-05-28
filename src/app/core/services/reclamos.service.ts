import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamo } from '../models/reclamo.model';
import { environment } from '../../../environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ReclamosService {
  private apiUrl = `${environment.apiUrl}/api/v1/reclamos`;

  constructor(private http: HttpClient) {}

  enviarReclamo(reclamo: Reclamo): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/enviar`, reclamo);
  }

  listarReclamos(): Observable<Reclamo[]> {
    // Vulnerable a XSS almacenado
    return this.http.get<Reclamo[]>(`${this.apiUrl}/listar`);
  }
}
