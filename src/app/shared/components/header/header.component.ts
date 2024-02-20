import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
navigateToMySurveys() {
throw new Error('Method not implemented.');
}
navigateToAbout() {
throw new Error('Method not implemented.');
}
isAdmin(): any {
throw new Error('Method not implemented.');
}
navigateToAdmin() {
throw new Error('Method not implemented.');
}
navigateToUserProfile() {
throw new Error('Method not implemented.');
}
navigateToLogin() {
throw new Error('Method not implemented.');
}
  constructor(private authService: AuthService, private router: Router) {}

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
}
