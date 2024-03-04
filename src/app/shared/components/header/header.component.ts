import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemeService } from '../../services/theme-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private isAdminUser: boolean | undefined;
  private icons: Array<any> = [];
  private themeSubscription: Subscription;
  private currentRoute!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    public themeService: ThemeService
  ) {
    this.themeSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.themeSubscription.add(
      this.themeService.isDarkTheme.subscribe((isDarkTheme) => {
        this.updateIcons(isDarkTheme);
      })
    );

    this.themeSubscription.add(
      this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.currentRoute = val.url;
          this.updateActiveStatus();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private updateIcons(isDarkTheme: boolean): void {
    console.log('Header is loading');

    this.icons = [];

    if (this.isLoggedIn()) {
      // Add icons for logged-in users
      this.icons.push({
        tooltip: 'My Surveys',
        icon: 'description',
        route: 'home',
        action: () => this.navigateToMySurveys(),
      });

      this.icons.push({
        tooltip: "My Responses",
        icon: 'assignment',
        route: 'my-submissions',
        action: () => this.navigateToMyResponses(),
      })

      if (this.isAdmin()) {
        this.icons.push({
          tooltip: 'Admin Dashboard',
          route: 'admin',
          icon: 'admin_panel_settings',
          action: () => this.navigateToAdmin(),
        });
      }

      this.icons.push({
        tooltip: 'Profile',
        route: 'profile',
        icon: 'account_circle',
        action: () => this.navigateToUserProfile(),
      });

      this.icons.push({
        tooltip: '',
        icon: isDarkTheme ? 'brightness_6' : 'brightness_3',
        action: () => this.toggleTheme(),
      });

      this.icons.push({
        tooltip: '',
        icon: 'logout',
        action: () => this.logout(),
      });
    } else {
      this.icons.push({
        tooltip: '',
        icon: isDarkTheme ? 'brightness_6' : 'brightness_3',
        action: () => this.toggleTheme(),
      });

      this.icons.push({
        tooltip: 'Login',
        icon: 'login',
        action: () => this.navigateToLogin(),
      });
    }
  }
  navigateToMyResponses() {
    this.router.navigate(['/my-submissions']);
  }

  private updateActiveStatus(): void {
    console.log('Updating active status for icons');

    this.icons.forEach((icon) => {
      icon.active = this.currentRoute.includes(icon.route);
    });
  }
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.updateHeader();
    this.openSnackBar('You have been logged out');
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
        this.updateHeader();
        console.log('Header isAdmin', this.isAdminUser);
      });
    }
    return this.isAdminUser || false;
  }

  updateHeader() {
    this.themeSubscription = this.themeService.isDarkTheme.subscribe(
      (isDarkTheme) => {
        this.updateIcons(isDarkTheme);
        this.updateActiveStatus();
      }
    );
  }

  refreshActiveStatus() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = val.url;
        this.updateActiveStatus();
      }
    });
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

  getNavigationIcons(): Array<any> {
    return this.icons;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
