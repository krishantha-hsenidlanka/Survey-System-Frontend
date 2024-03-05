import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: any;
  changePasswordForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.apiService.getUserDetails().subscribe(
      (userDetails) => {
        this.user = userDetails;
      },
      (error) => {
        this.snackBar.open('Failed to fetch user details', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
    );

    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    });
  }

  onSubmitChangePassword() {
    if (this.changePasswordForm.valid) {
      const passwordData = {
        currentPassword: this.changePasswordForm.value.currentPassword,
        newPassword: this.changePasswordForm.value.newPassword,
      };

      this.apiService.changePassword(passwordData).subscribe(
        (response) => {
          this.snackBar.open(response.message, 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });

          this.changePasswordForm.reset();
        },
        (error) => {
          this.snackBar.open('Failed to change password', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        }
      );
    }
  }
}
