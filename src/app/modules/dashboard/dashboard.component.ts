import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string | undefined;
  currentTime: string = '';
  surveys$: Observable<any[]> | undefined;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loadSurveys();
    this.getUsername();
    this.updateCurrentTime();
  }

  private loadSurveys() {
    this.surveys$ = this.apiService.getSurveysForLoggedInUser();
  }

  private getUsername() {
    this.apiService.getUserDetails().subscribe(
      (userDetails) => {
        this.username = userDetails.username;
      },    
      (error) => {
        console.error('Error fetching user details:', error);
      }
    )
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
    this.apiService.deleteSurveyById(surveyId).subscribe(
      (response) => {
        this.loadSurveys();
        alert(response.message);
      }
    );
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
              type: 'text'
            },
            {
              name: 'LastName',
              title: 'Enter your last name:',
              type: 'text'
            }
          ]
        }
      ]
    };

    this.apiService.createSurvey(newSurveyData).subscribe(
      (response) => {
        this.loadSurveys();
        const newSurveyId = response.id;
        window.open(`/survey/edit/${newSurveyId}`, '_blank');
      },
      (error) => {
        console.error('Error creating survey:', error);
        this.openSnackBar('Error creating survey. Please try again.');
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
