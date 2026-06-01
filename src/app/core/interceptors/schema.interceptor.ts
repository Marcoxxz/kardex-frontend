import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class SchemaInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const esquema = this.authService.getEsquemaActual();

    // Clonar la petición y añadir header con el esquema
    let clonedReq = req;
    if (esquema && esquema !== 'public') {
      clonedReq = req.clone({
        setHeaders: {
          'X-Schema': esquema,
        },
      });
    }

    return next.handle(clonedReq);
  }
}
