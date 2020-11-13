import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponse, User } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public error$ = new Subject<string>();

  get token(): string {
    return localStorage.getItem('jwtToken');
  }

  login(user: User): Observable<any> {
    return this.http
      .post('http://localhost:3000/auth/signin', user)
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error;

    console.log(message);
    switch (message) {
      case 'Unauthorized':
        this.error$.next('Invalid credentials');
        break;
      case 'User already exists':
        this.error$.next('User alredy exists');
        break;
      case 'Server Error':
        this.error$.next('Internal server error');
        break;
    }

    return throwError(error);
  }

  private setToken(response: AuthResponse | null) {
    if (response) {
      console.log(response);
      localStorage.setItem('jwtToken', response.accessToken);
    } else {
      localStorage.clear();
    }
  }
}
