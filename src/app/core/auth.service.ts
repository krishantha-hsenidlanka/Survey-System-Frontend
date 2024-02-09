import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    const url = `${this.apiUrl}/signup`;
    return this.http.post(url, user);
  }

  login(credentials: any): Observable<LoginResponse> {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, credentials).pipe(
      tap((response: any) => {
        this.storeToken(response.token);
      })
    );
  }

  private storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
