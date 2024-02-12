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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    RouterOutlet,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatOptionModule,
    FormlyModule.forRoot(),
    ReactiveFormsModule,
    FormlyMaterialModule,
    MatFormFieldModule,
    MatCardModule,
    AppRoutingModule,
    HttpClientModule,
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
