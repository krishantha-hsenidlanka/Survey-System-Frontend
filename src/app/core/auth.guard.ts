// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Update the path based on your project structure

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      console.log("Is Authenticated: ", this.authService.isAuthenticated(), "\nis Admin: ", this.authService.checkAdminStatus() );
      if (route.data['admin'] && !this.authService.checkAdminStatus()) {
        console.log("Is User Admin: ", this.authService.checkAdminStatus());
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
