// admin-dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from '../../core/auth.guard';
import { SurveysComponent } from './surveys/surveys.component';
import { LogComponent } from './log/log.component';

const adminDashboardRoutes: Routes = [
  {
    path: 'admin',
    component: SideNavComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'surveys', component: SurveysComponent },
      { path: 'logs', component: LogComponent },
      // Add more child routes for other admin-related components
    ],
    canActivate: [AuthGuard],
    data: { role: "admin" }
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminDashboardRoutes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
