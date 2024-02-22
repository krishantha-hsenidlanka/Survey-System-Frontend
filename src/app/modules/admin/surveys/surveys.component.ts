import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { SurveyDialogComponent } from './survey-dialog/survey-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css'],
})
export class SurveysComponent implements OnInit {
  folders: any[] = [];
  notes: any[] = [];
  selectedUserId: string | null = null;
  userSurveys: any[] = [];

  
  loadingSurveys: boolean = false;
  surveysLoaded: boolean = false;

  constructor(private apiService: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar ) {}

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe(
      (users: any[]) => {
        this.organizeUserData(users);
      },
      (error: any) => {
        console.error('Error fetching users:', error);
        this.snackBar.open('Failed to fetch users', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        })

      }
    );
  }

  private organizeUserData(users: any[]): void {
    this.folders = [];

    users.forEach((user: any) => {
      this.folders.push({
        id: user.id,
        name: user.username,
        created: user.registrationDate,
      });
    });
  }

  loadSurveys(userId: string): void {
    this.selectedUserId = userId;
    this.loadingSurveys = true;

    this.apiService.getSurveysByOwnerId(userId).subscribe(
      (surveys: any[]) => {
        this.userSurveys = surveys;
        this.surveysLoaded = true;
        this.loadingSurveys = false;
        this.openSurveyDialog(); // Open the dialog after surveys are loaded
      },
      (error: any) => {
        console.error(`Error fetching surveys for user ${userId}:`, error);
        this.snackBar.open(error.error.message, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],

        })
        this.loadingSurveys = false;
      }
    );
  }

  openSurveyDialog(): void {
    // Check if surveys are loaded before opening the dialog
    if (this.surveysLoaded) {
      const dialogRef = this.dialog.open(SurveyDialogComponent, {
        width: '80%', // Adjust as needed
        data: { surveys: this.userSurveys, userId: this.selectedUserId },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    }
  }
  toggleSurveys(userId: string): void {
    if (this.selectedUserId === userId) {
      this.selectedUserId = null;
    } else {
      this.selectedUserId = userId;
      this.loadSurveys(userId);
      this.openSurveyDialog();
    }
  }


}
