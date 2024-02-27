import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar
    ) {}

  private isAdminUser: boolean | undefined;

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.openSnackBar("You have been logged out");
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

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
