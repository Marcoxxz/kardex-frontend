import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../../environment/environment.prod';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  nombre_real: string;
  rol: string;
  esquema: string;
  ru: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/v1/auth`;

  constructor(private http: HttpClient) {}

  // Login para estudiantes (práctica aislada)
  loginEstudiante(ru: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login-estudiante`, {
      ru,
      password,
    });
  }

  login(credentials: LoginRequest): Observable<Usuario> {
    // Vulnerable a SQL Injection - para fines educativos
    console.log('🚨 SQL Query vulnerable ejecutada');
    return this.http.post<Usuario>(`${this.apiUrl}/login`, credentials);
  }

  getDebugUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/debug-list-users-dev-all`);
  }

  logout(): void {
    localStorage.removeItem('estudiante_practica');
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  getCurrentUser(): any {
    // 1. Intentamos leer los datos del Administrador / Usuario general
    const adminUser = localStorage.getItem('user');
    // 2. Intentamos leer los datos de la práctica del estudiante
    const estudiantePractica = localStorage.getItem('estudiante_practica');

    if (adminUser) {
      const parsedAdmin = JSON.parse(adminUser);

      // Si hay una práctica activa de fondo, le prestamos su esquema al administrador
      if (estudiantePractica) {
        const parsedEstudiante = JSON.parse(estudiantePractica);
        parsedAdmin.esquema = parsedEstudiante.esquema;
        parsedAdmin.ru = parsedEstudiante.ru; // Por si algún componente exige el RU
      }

      return parsedAdmin;
    }

    // Si no hay admin, pero sí estudiante de práctica, devolvemos el estudiante
    return estudiantePractica ? JSON.parse(estudiantePractica) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  getEsquemaActual(): string {
    const user = this.getCurrentUser();
    return user ? user.esquema : 'public';
  }
}
