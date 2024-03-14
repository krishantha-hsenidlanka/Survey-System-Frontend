import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { SurveyDialogComponent } from './survey-dialog/survey-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';

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
  loading: boolean = true;
  pageNumber: number = 0;
  pageSize: number = 8;
  totalPages: number = 0;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe(
      (users: any[]) => {
        this.loading = false;
        this.organizeUserData(users);
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
    this.apiService
      .getSurveysByOwnerId(userId, this.pageNumber, this.pageSize)
      .subscribe(
        (response) => {
          this.userSurveys = response.content;
          this.totalPages = response.totalPages;
          this.surveysLoaded = true;
          this.loadingSurveys = false;
          this.openSurveyDialog();
        },
        (error: any) => {
          this.snackBar.open(error.error.message, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
          this.loadingSurveys = false;
        }
      );
  }

  openSurveyDialog(): void {
    if (this.surveysLoaded) {
      const dialogRef = this.dialog.open(SurveyDialogComponent, {
        width: '80%',
        data: {
          surveys: this.userSurveys,
          userId: this.selectedUserId,
          pageNumber: this.pageNumber,
          totalPages: this.totalPages,
          previousPage: this.previousPage.bind(this),
          nextPage: this.nextPage.bind(this),
        },
      });
    }
  }

  toggleSurveys(userId: string): void {
    if (this.selectedUserId === userId) {
      this.selectedUserId = null;
    } else {
      this.selectedUserId = userId;
      this.loadSurveys(userId);
    }
  }

  previousPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      if (this.selectedUserId !== null) {
        this.loadSurveys(this.selectedUserId);
      }
    }
  }

  nextPage() {
    if (this.pageNumber < this.totalPages - 1) {
      this.pageNumber++;
      if (this.selectedUserId !== null) {
        this.loadSurveys(this.selectedUserId);
      }
    }
  }
}
