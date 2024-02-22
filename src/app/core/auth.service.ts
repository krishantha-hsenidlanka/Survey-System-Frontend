import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LoginResponse } from './auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private isAdmin = false;

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
        this.isAdmin = response.roles.includes('ROLE_ADMIN');
        console.log('Is admin', this.isAdmin);
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
    window.location.href = '/dashboard';
  }
  

  private redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  isUserAdmin(): boolean {
    let isAdmin: boolean = false;
    this.checkAdminStatus().subscribe((result) => {
      isAdmin = result;
    });
    return isAdmin;
  }

  checkAdminStatus(): Observable<boolean> {
    const url = 'http://localhost:8080/api/admin';
    return this.http.get<{ success: boolean }>(url).pipe(
      tap((response) => {
        console.log('Admin Status Response:', response);
        console.log('Is Admin:', response.success);
      }),
      map((response) => response.success),
      catchError((error) => {
        console.error('Error checking admin status:', error);
        this.logout();
        return of(false);
      })
    );
  }
  

  logout(): void {
    localStorage.removeItem('token');
    this.redirectToLogin();
  }
}
