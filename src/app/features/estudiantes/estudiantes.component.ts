import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudiantesService } from '../../core/services/estudiantes.service';
import { Router } from '@angular/router';
import { Estudiante } from '../../core/models/estudiante.model';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css'],
})
export class EstudiantesComponent {
  ci: string = '';
  resultados: Estudiante[] = [];
  lastQuery: string = '';
  loading: boolean = false;

  constructor(
    private estudiantesService: EstudiantesService,
    private router: Router,
  ) {}

  verKardex(ru: string) {
    this.router.navigate(['/kardex', ru]);
  }

  buscar() {
    this.loading = true;
    this.lastQuery = `SELECT ru, apellidos, carrera, ci, nombres FROM estudiantes WHERE ci = '${this.ci}'`;

    this.estudiantesService.buscarPorCi(this.ci).subscribe({
      next: (resultados) => {
        this.resultados = resultados;
        this.loading = false;
        this.showToast(`Encontrados ${resultados.length} registros`, 'success');
      },
      error: (error) => {
        this.showToast(error.error || 'Error en la consulta', 'error');
        this.loading = false;
      },
    });
  }

  setPayload(payload: string) {
    this.ci = payload;
    this.buscar();
  }

  private showToast(message: string, type: string) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
}
