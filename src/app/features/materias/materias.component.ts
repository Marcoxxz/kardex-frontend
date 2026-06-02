// src/app/pages/materias/materias.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MateriasService } from '../../core/services/materias.service';
import { Materia } from '../../core/models/materia.model';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css'],
})
export class MateriasComponent implements OnInit {
  materias: Materia[] = [];
  materiaSeleccionada: Materia | null = null;
  mostrarFormulario: boolean = false;
  editando: boolean = false;
  loading: boolean = false;
  searchTerm: string = '';
  filtroCarrera: string = '';
  filtroSemestre: number | null = null;

  // Nueva materia (para el formulario)
  nuevaMateria: Materia = {
    sigla: '',
    nombre: '',
    creditos: 4,
    carrera: '',
    semestre: 1,
    requisito: '',
    area: '',
    activo: true,
  };

  // Lista de carreras para el filtro
  carreras: string[] = [
    'Ing. Informática',
    'Ing. Sistemas',
    'Ing. Industrial',
    'Lic. Matemáticas',
    'Lic. Física',
  ];

  constructor(private materiasService: MateriasService) {}

  ngOnInit() {
    this.cargarMaterias();
  }

  cargarMaterias() {
    this.loading = true;
    this.materiasService.getAllMaterias().subscribe({
      next: (data) => {
        this.materias = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando materias', err);
        this.showNotification('Error al cargar materias', 'error');
        this.loading = false;
      },
    });
  }

  buscarMaterias() {
    if (this.searchTerm.trim()) {
      this.loading = true;
      this.materiasService.searchMaterias(this.searchTerm).subscribe({
        next: (data) => {
          this.materias = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error en búsqueda', err);
          this.loading = false;
        },
      });
    } else {
      this.cargarMaterias();
    }
  }

  filtrarPorCarrera() {
    if (this.filtroCarrera) {
      this.loading = true;
      this.materiasService.getMateriasByCarrera(this.filtroCarrera).subscribe({
        next: (data) => {
          this.materias = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error filtrando', err);
          this.loading = false;
        },
      });
    } else {
      this.cargarMaterias();
    }
  }

  limpiarFiltros() {
    this.searchTerm = '';
    this.filtroCarrera = '';
    this.filtroSemestre = null;
    this.cargarMaterias();
  }

  abrirFormularioCrear() {
    this.mostrarFormulario = true;
    this.editando = false;
    this.nuevaMateria = {
      sigla: '',
      nombre: '',
      creditos: 4,
      carrera: '',
      semestre: 1,
      requisito: '',
      area: '',
      activo: true,
    };
  }

  editarMateria(materia: Materia) {
    this.mostrarFormulario = true;
    this.editando = true;
    this.nuevaMateria = { ...materia };
  }

  guardarMateria() {
    if (
      !this.nuevaMateria.sigla ||
      !this.nuevaMateria.nombre ||
      !this.nuevaMateria.carrera
    ) {
      this.showNotification('Complete los campos obligatorios', 'error');
      return;
    }

    this.loading = true;

    if (this.editando) {
      this.materiasService
        .updateMateria(this.nuevaMateria.sigla, this.nuevaMateria)
        .subscribe({
          next: () => {
            this.showNotification(
              'Materia actualizada exitosamente',
              'success',
            );
            this.cargarMaterias();
            this.mostrarFormulario = false;
            this.loading = false;
          },
          error: (err) => {
            this.showNotification('Error al actualizar materia', 'error');
            this.loading = false;
          },
        });
    } else {
      this.materiasService.createMateria(this.nuevaMateria).subscribe({
        next: () => {
          this.showNotification('Materia creada exitosamente', 'success');
          this.cargarMaterias();
          this.mostrarFormulario = false;
          this.loading = false;
        },
        error: (err) => {
          this.showNotification(
            'Error al crear materia (¿La sigla ya existe?)',
            'error',
          );
          this.loading = false;
        },
      });
    }
  }

  eliminarMateria(sigla: string) {
    if (confirm(`¿Está seguro de eliminar la materia ${sigla}?`)) {
      this.loading = true;
      this.materiasService.deleteMateria(sigla).subscribe({
        next: () => {
          this.showNotification('Materia eliminada', 'success');
          this.cargarMaterias();
          this.loading = false;
        },
        error: (err) => {
          this.showNotification('Error al eliminar materia', 'error');
          this.loading = false;
        },
      });
    }
  }

  toggleActivarMateria(materia: Materia) {
    const action = materia.activo ? 'desactivar' : 'activar';
    const serviceCall = materia.activo
      ? this.materiasService.desactivarMateria(materia.sigla)
      : this.materiasService.activarMateria(materia.sigla);

    serviceCall.subscribe({
      next: (resp) => {
        console.log('RESPUESTA PATCH', resp);

        this.showNotification(`Materia ${action}ada`, 'success');
        this.cargarMaterias();
      },
      error: (err) => {
        console.error('ERROR COMPLETO', err);
        this.showNotification(`Error al ${action} materia`, 'error');
      },
    });
  }

  private showNotification(message: string, type: string) {
    // Usa tu sistema de notificaciones existente
    console.log(`${type}: ${message}`);
    // O puedes usar alert temporal
    alert(message);
  }
}
