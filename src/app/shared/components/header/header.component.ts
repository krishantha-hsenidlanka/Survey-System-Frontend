import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    // Additional logout logic, e.g., redirecting to login page
  }
}
