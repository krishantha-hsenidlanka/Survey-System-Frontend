import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SurveyPromptDialogComponent } from '../survey/survey-prompt-dialog/survey-prompt-dialog.component';

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

  constructor(
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadSurveys();
    this.getUsername();
    this.updateCurrentTime();
  }

  private loadSurveys() {
    this.apiService.getSurveysForLoggedInUser().subscribe(
      (response) => {
        this.surveys$ = of(response as any[]);
        this.surveysLoaded = true;
      },
      (error) => {
        if (error.status === 404) {
          this.surveys$ = of([]);
          this.surveysLoaded = true;
        } else {
          console.error('Error fetching survey details:', error);
          this.openSnackBar('Error fetching surveys. Please try again.');
        }
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
    this.apiService.deleteSurveyById(surveyId).subscribe((response) => {
      this.loadSurveys();
      this.openSnackBar(response.message);
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
          console.log(result);
          this.loadSurveys();
          this.navigateToSurvey(result);
        }
      },
      (error) => {
        this.openSnackBar('Error processing survey. Please try again.');
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
