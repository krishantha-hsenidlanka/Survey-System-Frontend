import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  selectedUser: any | null = null;
  updatedUser: any = {};
  loading: boolean = true;

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
        this.snackBar.open('Failed to fetch users', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }

  editUser(user: any): void {
    this.selectedUser = user;
    this.updatedUser = {
      username: user.username,
      email: user.email,
      roles: user.roles.map((role: any) => role.name),
      enabled: user.enabled,
    };
  }

  saveChanges(updatedUser: any): void {
    this.apiService.updateUser(this.selectedUser.id, updatedUser).subscribe(
      (response: any) => {
        this.selectedUser = null;
        this.updatedUser = {};
        this.closeModal();
        this.snackBar.open('User details updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.apiService.getAllUsers().subscribe(
          (data: any[]) => {
            this.users = data;
          },
          (error: any) => {
            this.snackBar.open('Failed to fetch users', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar'],
            });
          }
        );
      },
      (error: any) => {
        this.snackBar.open('Failed to update user details', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }

  closeModal(): void {
    this.selectedUser = null;
    this.updatedUser = {};
  }

  getRoles(user: any): string {
    const roleNames = user.roles.map((role: string) => {
      const match = role.match(/name=(\w+)/);
      return match ? match[1] : '';
    });
    return roleNames.includes('ROLE_ADMIN') ? 'Admin' : 'User';
  }
}
