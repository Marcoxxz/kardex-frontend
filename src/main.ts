import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

async function iniciarPractica(): Promise<boolean> {
  const ru = prompt(
    '🔐 INICIO DE PRÁCTICA - KARDEX DIGITAL\n\n📚 Ingresa tu RU (Registro Universitario):\n\nEjemplo: 20210001',
  );

  if (!ru) {
    alert('❌ Es necesario ingresar un RU para continuar');
    return false;
  }

  const password = prompt(
    '🔐 INICIO DE PRÁCTICA - KARDEX DIGITAL\n\n🔑 Ingresa tu contraseña:\n\n(Contraseña por defecto: 123456)',
  );

  if (!password) {
    alert('❌ Es necesario ingresar una contraseña');
    return false;
  }

  try {
    const response = await fetch(
      'https://kardex-backend-nctf.onrender.com/api/v1/auth/login-estudiante',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ru,
          password,
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem(
        'estudiante_practica',
        JSON.stringify({
          ru,
          esquema: data.esquema,
          nombre: data.nombre_real,
          token: 'practica_' + ru,
        }),
      );

      alert(
        `✅ ¡Bienvenido a tu entorno de prácticas!\n\n` +
          `📚 Estudiante: ${data.nombre_real}\n` +
          `🔬 Esquema aislado: ${data.esquema}\n\n` +
          `⚠️ Recuerda: Estás en un entorno seguro. ¡Puedes practicar sin miedo!`,
      );

      return true;
    }

    alert(
      `❌ Error de autenticación:\n\n` +
        `${data.error || data.message || 'Credenciales incorrectas'}\n\n` +
        `💡 Consejo: Usa la contraseña por defecto "123456"`,
    );

    return false;
  } catch (error) {
    alert(
      '❌ Error de conexión con el servidor\n\n' +
        'Verifica tu conexión a internet',
    );

    return false;
  }
}

iniciarPractica().then((exito) => {
  if (exito) {
    bootstrapApplication(AppComponent, {
      providers: [provideRouter(routes), provideHttpClient()],
    }).catch((err) => console.error(err));
  } else {
    const appRoot = document.querySelector('app-root');
    const errorScreen = document.getElementById('login-error');

    if (appRoot) {
      (appRoot as HTMLElement).style.display = 'none';
    }

    if (errorScreen) {
      errorScreen.style.display = 'flex';
    }
  }
});
