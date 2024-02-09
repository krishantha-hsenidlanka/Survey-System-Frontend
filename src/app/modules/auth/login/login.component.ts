import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm = new FormGroup({});
  model = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: 'Username',
        required: true,
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        required: true,
      },
    },
  ];

  constructor(private authService: AuthService) {}


  onSubmit() {
    const credentials = {
      username: (this.model as { username: string })['username'],
      password: (this.model as { password: string })['password'],
    };

    this.authService.login(credentials).subscribe(
      (response) => {
        // Handle successful login
        console.log(response);
        // Redirect or perform additional actions as needed
      },
      (error) => {
        // Handle login error
        console.error(error);
        alert('Login failed. Please try again.');
        // Display error message or take appropriate action
      }
    );
  }
}