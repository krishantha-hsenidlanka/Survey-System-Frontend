import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from './auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  constructor(private http: HttpClient, private router: Router) {}

  register(user: any): Observable<any> {
    const url = `${this.apiUrl}/signup`;
    return this.http.post(url, user);
  }

  login(credentials: any): Observable<LoginResponse> {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, credentials).pipe(
      tap((response: any) => {
        this.storeToken(response.token);
        this.redirectToDashboard();
      })
    );
  }

  private storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  private redirectToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  private redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.redirectToLogin();
  }
}
