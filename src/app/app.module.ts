import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './modules/auth/login/login.component';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './modules/auth/register/register.component';
import { AuthService } from './core/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/auth.interceptor';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import { SurveyCreatorModule } from 'survey-creator-angular';
import { SurveyCreatorComponent } from './modules/survey/survey-creator/survey-creator.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { SurveyViewerComponent } from './modules/survey/survey-viewer/survey-viewer.component';
import { SurveyModule } from 'survey-angular-ui';
import { ViewResponseComponent } from './modules/survey/view-response/view-response.component';
import { ViewSurveyAnalyticsComponent } from './modules/survey/view-survey-analytics/view-survey-analytics.component';
import { ViewResponsePageComponent } from './modules/survey/view-response-page/view-response-page.component';
import { AdminDashboardComponent } from './modules/admin/admin-dashboard/admin-dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    SurveyCreatorComponent,
    DashboardComponent,
    SurveyViewerComponent,
    ViewResponseComponent,
    ViewSurveyAnalyticsComponent,
    ViewResponsePageComponent,
    AdminDashboardComponent,

  ],
  imports: [
    RouterOutlet,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatOptionModule,
    MatTabsModule,
    MatMenuModule,
    FormlyModule.forRoot(),
    ReactiveFormsModule,
    FormlyMaterialModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
    SurveyCreatorModule,
    SurveyModule
  ],
  providers: [
    provideAnimationsAsync(),
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
