import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TramitesService } from '../../core/services/tramites.service';
import { Tramite } from '../../core/models/tramite.model';
import { Estudiante } from '../../core/models/estudiante.model';

@Component({
  selector: 'app-tramites',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.css'],
})
export class TramitesComponent {
  nuevoTramite: Tramite = {
    descripcion: '',
    codigoSeguridad: '',
    estado: 'PENDIENTE',
  };
  tramiteId: number | null = null;
  resultadosAuditoria: Estudiante[] = [];
  tramiteCreado: Tramite | null = null;
  loading: boolean = false;

  constructor(private tramitesService: TramitesService) {}

  crearTramite() {
    this.loading = true;
    this.tramitesService.crearTramite(this.nuevoTramite).subscribe({
      next: (response) => {
        this.showToast(response, 'success');
        this.tramiteCreado = { ...this.nuevoTramite };
        this.nuevoTramite = {
          descripcion: '',
          codigoSeguridad: '',
          estado: 'PENDIENTE',
        };
        this.loading = false;
      },
      error: (err) => {
        this.showToast('Error al crear trámite', 'error');
        this.loading = false;
      },
    });
  }

  auditarTramite() {
    if (!this.tramiteId) return;

    this.loading = true;
    this.tramitesService.auditarTramite(this.tramiteId).subscribe({
      next: (resultados) => {
        this.resultadosAuditoria = resultados;
        this.loading = false;
        this.showToast(
          `Auditoría completada: ${resultados.length} estudiantes encontrados`,
          'success',
        );
      },
      error: (err) => {
        this.showToast(err.error || 'Error en auditoría', 'error');
        this.loading = false;
      },
    });
  }

  setSecondOrderPayload() {
    this.nuevoTramite.codigoSeguridad = `Sistemas' OR '1'='1`;
    this.showToast('Payload SQLi de segundo orden cargado', 'warning');
  }

  private showToast(message: string, type: string) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
}
