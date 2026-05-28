import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nota } from '../models/nota.model';

@Injectable({
  providedIn: 'root',
})
export class NotasService {
  private apiUrl = 'http://localhost:8080/api/v1/notas';

  constructor(private http: HttpClient) {}

  // Vulnerable a IDOR
  consultarNotaPorId(id: number): Observable<Nota> {
    return this.http.get<Nota>(`${this.apiUrl}/consultar/${id}`);
  }
}
