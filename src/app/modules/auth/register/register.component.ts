// register.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private snackBar: MatSnackBar) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      if (userData.password !== userData.confirmPassword) {
        this.openSnackBar('Password and Confirm Password must match.');
        return;
      }

      this.apiService.registerUser(userData).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          this.openSnackBar('User registered successfully!');
          //navigate to login page
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error registering user:', error);
          this.openSnackBar(error.error.message);
          // Handle error (display message, log, etc.)
        }
      );
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
