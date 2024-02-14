import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../../shared/services/survey.service';
import { Model } from 'survey-core';

@Component({
  selector: 'app-survey-viewer',
  templateUrl: './survey-viewer.component.html',
  styleUrl: './survey-viewer.component.css'
})

export class SurveyViewerComponent implements OnInit {
  survey: any;
  surveyModel: Model;


  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService
  ) {
    this.surveyModel = new Model(); 
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const surveyId = params['id'];

      if (surveyId) {
        this.surveyService.getSurveyById(surveyId).subscribe(
          (surveyData) => {
            this.survey = surveyData;
            const survey = new Model(surveyData);
            this.surveyModel = survey;
          },
          (error) => {
            console.error('Error fetching survey:', error);
            // Handle error as needed
          }
        );
      }
    });
  }
}
