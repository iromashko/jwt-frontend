import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      request = request.clone({
        setParams: {
          auth: this.authService.token,
        },
      });
    }
    return next.handle(request).pipe(
      tap(() => console.log(`Intercept`)),
      catchError((error: HttpErrorResponse) => {
        console.log(`Interceptor Error: `, error);
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/']);
        }
        return throwError(error);
      })
    );
  }
}
