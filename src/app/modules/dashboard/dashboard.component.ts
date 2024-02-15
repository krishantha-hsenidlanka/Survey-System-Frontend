import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  surveys$: Observable<any[]> | undefined;

  constructor(private ApiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadSurveys();
  }

  private loadSurveys() {
    this.surveys$ = this.ApiService.getSurveysForLoggedInUser();
  }

  navigateToSurvey(surveyId: string) {
    window.open(`/survey/edit/${surveyId}`, '_blank');
  }

  navigateToViewSurvey(surveyId: string){
    window.open(`/survey/${surveyId}`, '_blank');
  }

  navigateToSurveyResponses(surveyId: string){
    window.open(`/responses/${surveyId}`, '_blank');
  }

  deleteSurvey(surveyId: string) {
    this.ApiService.deleteSurveyById(surveyId).subscribe(
      (response) => {
        this.loadSurveys();
        alert(response.message);
      }
    )
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

    this.ApiService.createSurvey(newSurveyData).subscribe(
      (response) => {
        this.loadSurveys();
        const newSurveyId = response.id;
        window.open(`/survey/edit/${newSurveyId}`, '_blank');
      },
      (error) => {
        console.error('Error creating survey:', error);
      }
    );
  }
}
