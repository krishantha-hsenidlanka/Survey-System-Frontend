import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SurveyPromptDialogComponent } from '../survey/survey-prompt-dialog/survey-prompt-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
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
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadSurveys();
    this.getUsername();
    this.updateCurrentTime();
  }

  
private loadSurveys() {
  this.apiService.getSurveysForLoggedInUser().subscribe(
    (response) => {
      this.surveys$ = of(response as any[]);  // Assuming response is an array
      this.surveysLoaded = true;
    },
    (error) => {
      if (error.status === 404) {
        // Handle 404 error (Not Found)
        this.surveys$ = of([]);  // Empty observable
        this.surveysLoaded = true;
      } else {
        console.error('Error fetching survey details:', error);
        // Display an error message for other errors
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
    try{
      window.open(`/survey/edit/${surveyId}`, '_blank');

    } catch(e){
      console.log("Error in navigating: " + e);
    }
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

  openGenerateSurveyDialog() {
    const dialogRef = this.dialog.open(SurveyPromptDialogComponent, {
      width: '400px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result) {
        console.log(result);
        this.loadSurveys();
        this.navigateToSurvey(result);
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
