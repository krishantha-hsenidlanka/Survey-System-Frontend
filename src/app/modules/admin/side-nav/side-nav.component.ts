import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  navItems: any[] = [
    { label: 'Home', icon: 'home', route: '/admin/home' },
    { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { label: 'Users', icon: 'people', route: '/admin/users' },
    { label: 'Surveys', icon: 'description', route: '/admin/surveys' },
    { label: 'App Log', icon: 'terminal', route: '/admin/logs' }
  ];
}
