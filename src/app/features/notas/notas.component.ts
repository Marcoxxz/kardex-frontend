import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotasService } from '../../core/services/notas.service';
import { Nota } from '../../core/models/nota.model';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css'],
})
export class NotasComponent {
  notaId: number | null = null;
  nota: Nota | null = null;
  loading: boolean = false;

  constructor(private notasService: NotasService) {}

  consultar() {
    if (!this.notaId) return;

    this.loading = true;
    this.notasService.consultarNotaPorId(this.notaId).subscribe({
      next: (nota) => {
        this.nota = nota;
        this.loading = false;
        this.showToast(`Nota encontrada: ${nota.nombreMateria}`, 'success');
      },
      error: (error) => {
        this.showToast(error.error || 'Nota no encontrada', 'error');
        this.nota = null;
        this.loading = false;
      },
    });
  }

  private showToast(message: string, type: string) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
}
