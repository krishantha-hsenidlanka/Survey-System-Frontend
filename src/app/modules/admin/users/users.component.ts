import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users: any[] = [];

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  getRoles(user: any): string {
    return user.roles.map((role: { name: any; }) => role.name).join(', ');
  }


}
