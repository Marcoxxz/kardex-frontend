import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../../environment/environment.prod';

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/v1/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<Usuario> {
    // Vulnerable a SQL Injection - para fines educativos
    console.log('🚨 SQL Query vulnerable ejecutada');
    return this.http.post<Usuario>(`${this.apiUrl}/login`, credentials);
  }

  getDebugUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/debug-list-users-dev-all`);
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  getCurrentUser(): Usuario | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
