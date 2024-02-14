import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../shared/services/survey.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  surveys$: Observable<any[]> | undefined;

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit() {
    this.surveys$ = this.surveyService.getSurveysForLoggedInUser();
  }

  navigateToSurvey(surveyId: string) {
    this.router.navigate(['/survey', surveyId]);
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

    this.surveyService.createSurvey(newSurveyData).subscribe(
      (response) => {
        const newSurveyId = response.id;
        this.router.navigate(['/survey', newSurveyId]);
      },
      (error) => {
        console.error('Error creating survey:', error);
      }
    );
  }
}
