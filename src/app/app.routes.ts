import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EstudiantesComponent } from './features/estudiantes/estudiantes.component';
import { NotasComponent } from './features/notas/notas.component';
import { ReclamosComponent } from './features/reclamos/reclamos.component';
import { TramitesComponent } from './features/tramites/tramites.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'estudiantes', component: EstudiantesComponent },
  { path: 'notas', component: NotasComponent },
  { path: 'reclamos', component: ReclamosComponent },
  { path: 'tramites', component: TramitesComponent },
  { path: '**', redirectTo: '/login' },
];
