import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ApiService } from '../../../shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  registerForm = new FormGroup({});
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
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Email',
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
    // Add other fields as needed
  ];

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.apiService.registerUser(userData).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          alert('User registered successfully!');
          //navigate to login page
          this.router.navigate(['/login']);

          // Add any additional logic or redirect to login page
        },
        (error) => {
          console.error('Error registering user:', error);
          alert(error);
          // Handle error (display message, log, etc.)
        }
      );
    }
  }
}
