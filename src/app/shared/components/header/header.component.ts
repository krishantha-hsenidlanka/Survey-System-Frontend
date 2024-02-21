import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  private isAdminUser: boolean | undefined;

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    // Additional logout logic, e.g., redirecting to login page
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToMySurveys() {
    this.router.navigate(['/']);
  }
  navigateToAbout() {
    this.router.navigate(['/about']);
  }
  isAdmin(): boolean {
    if (this.isAdminUser === undefined) {
      this.authService.checkAdminStatus().subscribe((isAdmin) => {
        this.isAdminUser = isAdmin;
        console.log('Header isAdmin', this.isAdminUser);
      });
    }
    return this.isAdminUser || false;
  }

  navigateToAdmin() {
    this.router.navigate(['/admin/dashboard']);
  }
  navigateToUserProfile() {
    this.router.navigate(['/profile']);
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
