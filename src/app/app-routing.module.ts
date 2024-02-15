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

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'dashboard',
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
    path:'responses/:id',
    component: ViewResponsePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'analytics/:id',
    component: ViewSurveyAnalyticsComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
