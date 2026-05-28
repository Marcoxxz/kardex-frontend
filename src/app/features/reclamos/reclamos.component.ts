import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReclamosService } from '../../core/services/reclamos.service';
import { Reclamo } from '../../core/models/reclamo.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reclamos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.css'],
})
export class ReclamosComponent implements OnInit {
  reclamos: Reclamo[] = [];
  nuevoReclamo: Reclamo = {
    ru: '',
    asunto: '',
    detalle: '',
  };
  loading: boolean = false;
  currentUser: any;

  constructor(
    private reclamosService: ReclamosService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.esAdmin()) {
      this.cargarReclamos();
    }
  }

  esAdmin(): boolean {
    return this.currentUser?.rol === 'ADMINISTRADOR';
  }

  cargarReclamos() {
    this.reclamosService.listarReclamos().subscribe({
      next: (reclamos) => {
        this.reclamos = reclamos;
      },
      error: (err) => {
        console.error('Error cargando reclamos');
      },
    });
  }

  enviarReclamo() {
    this.loading = true;
    this.reclamosService.enviarReclamo(this.nuevoReclamo).subscribe({
      next: () => {
        this.showNotification('Reclamo enviado exitosamente', 'success');
        this.nuevoReclamo = { ru: '', asunto: '', detalle: '' };
        if (this.esAdmin()) {
          this.cargarReclamos();
        }
        this.loading = false;
      },
      error: (err) => {
        this.showNotification('Error al enviar reclamo', 'error');
        this.loading = false;
      },
    });
  }

  private showNotification(message: string, type: string) {
    // Notificación simple sin dar pistas
    alert(message);
  }
}
