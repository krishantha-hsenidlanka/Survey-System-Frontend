import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { SurveyPromptDialogComponent } from '../survey/survey-prompt-dialog/survey-prompt-dialog.component';
import { DeleteConfirmationDialogComponent } from '../survey/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  username: string | undefined;
  currentTime: string = '';
  surveys$: Observable<any[]> | undefined;
  surveysLoaded: boolean = false;
  pageNumber: number = 0;
  pageSize: number = 10; 
  totalPages: number = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private clipboard: Clipboard
  ) {}

  ngOnInit() {
    this.loadSurveys();
    this.getUsername();
    this.updateCurrentTime();
  }

  private loadSurveys() {
    this.apiService.getSurveysForLoggedInUser(this.pageNumber, this.pageSize).subscribe(
      (response) => {
        this.surveys$ = of(response.content); 
        this.totalPages = response.totalPages;
        this.surveysLoaded = true;
      },
      (error) => {
        this.openSnackBar('Error fetching surveys. Please try again.');
      }
    );
  }  

  private getUsername() {
    this.apiService.getUserDetails().subscribe(
      (userDetails) => {
        this.username = userDetails.username.toUpperCase();
      },
      (error) => {
        this.openSnackBar('Error fetching username. Please try again.');
      }
    );
  }

  private updateCurrentTime() {
    setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    }, 1000);
  }

  navigateToSurvey(surveyId: string) {
    window.open(`/survey/edit/${surveyId}`, '_blank');
  }

  navigateToViewSurvey(surveyId: string) {
    window.open(`/survey/${surveyId}`, '_blank');
  }

  navigateToSurveyResponses(surveyId: string) {
    window.open(`/responses/${surveyId}`, '_blank');
  }

  deleteSurvey(surveyId: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.apiService.deleteSurveyById(surveyId).subscribe((response) => {
          this.loadSurveys();
          this.openSnackBar(response.message);
        });
      }
    });
  }

  createNewSurvey() {
    const newSurveyData = {
      title: 'New',
      description: 'New',
      pages: [
        {
          name: 'Name',
          elements: [
            {
              name: 'FirstName',
              title: 'Enter your first name:',
              type: 'text',
            },
            {
              name: 'LastName',
              title: 'Enter your last name:',
              type: 'text',
            },
          ],
        },
      ],
    };

    this.apiService.createSurvey(newSurveyData).subscribe(
      (response) => {
        this.loadSurveys();
        const newSurveyId = response.id;
        this.navigateToSurvey(newSurveyId);
      },
      (error) => {
        this.openSnackBar('Error creating survey. Please try again.');
      }
    );
  }

  openGenerateSurveyDialog() {
    const dialogRef = this.dialog.open(SurveyPromptDialogComponent, {
      width: '90vh',
    });

    dialogRef.afterClosed().subscribe(
      (result: string | undefined) => {
        if (result) {
          this.loadSurveys();
          this.navigateToSurvey(result);
        }
      },
      (error) => {
        this.openSnackBar('Error processing survey. Please try again.');
      }
    );
  }

  copySurveyLink(surveyId: string) {
    const surveyLink = `${window.location.origin}/survey/${surveyId}`;
    this.clipboard.copy(surveyLink);
    this.openSnackBar('Survey link copied to clipboard');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  nextPage() {
    if (this.pageNumber < this.totalPages - 1) {
      this.pageNumber++;
      this.loadSurveys();
    }
  }

  previousPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.loadSurveys();
    }
  }
}
