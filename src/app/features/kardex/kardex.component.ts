import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ← AGREGADO
import { KardexService } from '../../core/services/kardex.service';

@Component({
  selector: 'app-kardex',
  standalone: true, // ← AGREGADO (porque usas standalone components)
  imports: [CommonModule], // ← AGREGADO (necesario para *ngIf, *ngFor)
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css'], // ← CORREGIDO: styleUrl → styleUrls (plural)
})
export class KardexComponent implements OnInit {
  kardexData: any = null;
  ruEstudiante = 'TU_RU_AQUI'; // Cámbialo por el RU del usuario logueado
  loading: boolean = false; // ← AGREGADO (para mostrar estado de carga)
  errorMessage: string = ''; // ← AGREGADO (para mostrar errores)

  constructor(private kardexService: KardexService) {}

  ngOnInit() {
    this.cargarKardex();
  }

  cargarKardex() {
    this.loading = true;
    this.errorMessage = '';

    this.kardexService.getKardexByRU(this.ruEstudiante).subscribe({
      next: (data) => {
        this.kardexData = data;
        this.loading = false;
        console.log('Kardex cargado:', data);
      },
      error: (error) => {
        console.error('Error al cargar kardex:', error);
        this.errorMessage =
          'Error al cargar el kardex. Verifique que el estudiante exista.';
        this.loading = false;
      },
    });
  }
}
