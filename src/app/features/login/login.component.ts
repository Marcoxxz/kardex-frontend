import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  lastQuery: string = '';
  lastPayload: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    this.lastPayload = this.username;
    this.lastQuery = `SELECT * FROM usuarios WHERE username = '${this.username}' AND password = MD5('${this.password}')`;

    this.authService
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: (user) => {
          this.showToast(`✅ ¡Bienvenido ${user.nombre_real}!`, 'success');
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/dashboard']);
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = error.error || 'Credenciales incorrectas';
          this.showToast(this.errorMessage, 'error');
          this.loading = false;
        },
      });
  }

  setPayload(payload: string) {
    this.username = payload;
    this.lastPayload = payload;
  }

  private showToast(message: string, type: string) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
}
