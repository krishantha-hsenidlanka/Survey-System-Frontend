import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service'; 
import {
  Observable,
  catchError,
  combineLatest,
  of,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    //Authentication check 
    const isAuthenticated = this.authService.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return of(false);
    }
    // Admin role check
    if (route.data['role'] === 'admin') {
      return this.authService.checkAdminStatus().pipe(
        switchMap((isAdmin) => {
          if (!isAdmin) {
            this.router.navigate(['/home']);
            return of(false);
          }
          return of(true);
        }),
        catchError((error) => {
          this.router.navigate(['/error']);
          return of(false);
        })
      );
    }
    return of(true);
  }
}
