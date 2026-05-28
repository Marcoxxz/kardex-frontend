import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // ✅ Importar RouterOutlet

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],  // ✅ Agregar a imports
  template: `<router-outlet></router-outlet>`,  // ✅ Usar en template
  styles: []
})
export class AppComponent {
  title = 'kardex-frontend';
}
