import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuard } from './core/auth.guard';
import { NoAuthGuard } from './core/no-auth.guard';
import { SurveyCreatorComponent } from './modules/survey/survey-creator/survey-creator.component';
import { SurveyViewerComponent } from './modules/survey/survey-viewer/survey-viewer.component';
import { ViewResponseComponent } from './modules/survey/view-response/view-response.component';
import { ViewSurveyAnalyticsComponent } from './modules/survey/view-survey-analytics/view-survey-analytics.component';
import { ViewResponsePageComponent } from './modules/survey/view-response-page/view-response-page.component';
import { AdminDashboardComponent } from './modules/admin/admin-dashboard/admin-dashboard.component';
import { SettingsComponent } from './modules/admin/settings/settings.component';
import { AdminDashboardModule } from './modules/admin/admin-dashboard.module';
import { AdminDashboardRoutingModule } from './modules/admin/admin-dashboard-routing.module';
import { UserComponent } from './modules/user/user.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { MySubmissionsViewerComponent } from './modules/survey/my-submissions-viewer/my-submissions-viewer.component';
import { VerifyUserComponent } from './modules/auth/verify-user/verify-user.component';
import { ErrorComponent } from './modules/error/error.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'verify',
    component: VerifyUserComponent,
    canActivate: [NoAuthGuard],
  },

  {
    path: 'profile',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-survey',
    component: SurveyCreatorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'survey/edit/:id',
    component: SurveyCreatorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'survey/:id',
    component: SurveyViewerComponent,
  },
  {
    path: 'responses/:id',
    component: ViewResponsePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-submissions',
    component: MySubmissionsViewerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'analytics/:id',
    component: ViewSurveyAnalyticsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes), AdminDashboardRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
