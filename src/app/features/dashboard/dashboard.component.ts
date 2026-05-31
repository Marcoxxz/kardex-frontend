import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { KardexService } from '../../core/services/kardex.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  estadisticas = {
    materiasActivas: 0,
    promedioGeneral: 0,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private kardexService: KardexService,
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    } else {
      this.cargarEstadisticasReales();
    }
  }
  
  cargarEstadisticasReales() {
    // Obtener el RU del estudiante logueado (debes obtenerlo de donde lo guardes)
    const ru = this.user?.ru || '20210001'; // Temporal

    this.kardexService.getKardexByRU(ru).subscribe({
      next: (data) => {
        if (data && data.resumen) {
          this.estadisticas.materiasActivas = data.resumen.totalMaterias || 0;
          this.estadisticas.promedioGeneral =
            data.resumen.promedioPonderado || 0;
        }
      },
      error: (err) => {
        console.error('Error cargando estadísticas', err);
      },
    });
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  getCurrentYear(): string {
    return new Date().getFullYear().toString();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
