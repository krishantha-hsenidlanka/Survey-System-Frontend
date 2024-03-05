import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrl: './verify-user.component.css',
})
export class VerifyUserComponent implements OnInit {
  verificationToken!: string;
  errorMessage: string = '';
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.verificationToken = params['token'];
      if (this.verificationToken) {
        this.verifyUser();
      }
    });
  }

  verifyUser() {
    this.apiService.verifyUser(this.verificationToken).subscribe(
      (response) => {
        this.loading = false;
        this.snackBar.open('User account verified and activated', 'Close', {
          duration: 5000,
        });
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.error.message;
        if (error.error.message)
          this.snackBar.open(this.errorMessage, 'Close', { duration: 5000 });
      }
    );
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
