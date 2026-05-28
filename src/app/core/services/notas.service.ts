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

  // Vulnerable a IDOR
  consultarNotaPorId(id: number): Observable<Nota> {
    return this.http.get<Nota>(`${this.apiUrl}/consultar/${id}`);
  }
}
