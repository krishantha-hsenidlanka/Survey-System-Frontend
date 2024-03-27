import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const credentials = this.loginForm.value;

      this.authService
        .login(credentials)
        .subscribe(
          (response) => {
            this.openSnackBar('Login successful');
          },
          (error) => {
            if (error.error.message == 'Bad credentials') {
              this.openSnackBar(
                'Invalid username or password. Please try again'
              );
            } else if (error.error.message == 'User is disabled') {
              this.openSnackBar(
                'Account not activated. Please verify your account via email'
              );
            } else
              this.openSnackBar(`Login failed. Reason: ${error.error.message}`);
          }
        )
        .add(() => {
          this.loading = false;
        });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
