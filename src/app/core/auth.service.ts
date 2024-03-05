import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LoginResponse } from './auth.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAdmin = false;

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any): Observable<any> {
    const url = `${this.apiUrl}/auth/signup`;
    return this.http.post(url, user);
  }

  login(credentials: any): Observable<LoginResponse> {
    const url = `${this.apiUrl}/auth/login`;
    return this.http.post(url, credentials).pipe(
      tap((response: any) => {
        this.storeToken(response.token);
        this.isAdmin = response.roles.includes('ROLE_ADMIN');
        if (this.isAdmin == true) {
          this.redirectToAdmin();
        } else {
          this.redirectToDashboard();
        }
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
    window.location.href = '/home';
  }

  private redirectToAdmin(): void {
    window.location.href = '/admin/home';
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
    const url = `${this.apiUrl}/admin`;
    return this.http.get<{ success: boolean }>(url).pipe(
      map((response) => response.success),
      catchError((error) => {
        if (error.status === 401) {
          //unautherized
          this.logout();
          return of(false);
        }
        //error checking admin status
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.redirectToLogin();
  }
}
