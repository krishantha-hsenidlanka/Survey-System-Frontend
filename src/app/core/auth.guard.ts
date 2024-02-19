// auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service'; // Update the path based on your project structure
import {
  Observable,
  catchError,
  combineLatest,
  forkJoin,
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
    const isAuthenticated = this.authService.isAuthenticated();

    console.log('Is Authenticated: ', isAuthenticated);

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return of(false);
    }

    if (route.data['role'] === 'admin') {
      console.log('admin required');
      return this.authService.checkAdminStatus().pipe(
        switchMap((isAdmin) => {
          console.log('Is User Admin: ', isAdmin);

          if (!isAdmin) {
            this.router.navigate(['/dashboard']);
            return of(false);
          }

          return of(true);
        }),
        catchError((error) => {
          if (error.status === 403) {
            console.log('forbidden');
          } else if (error.status === 401) {
            console.log('unauthorized');
          } else {
            console.error('Error occurred in canActivate:', error);
          }
          this.router.navigate(['/error']);
          return of(false);
        })
      );
    }

    return of(true);
  }
}
