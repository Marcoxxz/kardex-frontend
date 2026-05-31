import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KardexResponse } from '../models/kardex-response.model'; // ← Importa la interfaz
import { environment } from '../../../environment/environment.prod';

@Injectable({ providedIn: 'root' })
export class KardexService {
  // ✅ CORREGIDO: Usa la URL correcta del backend
  private apiUrl = `${environment.apiUrl}/api/kardex`;

  constructor(private http: HttpClient) {}

  getKardexByRU(ru: string): Observable<KardexResponse> {
    // ✅ Ahora apunta a: /api/kardex/estudiante/{ru}
    return this.http.get<KardexResponse>(`${this.apiUrl}/estudiante/${ru}`);
  }
}
