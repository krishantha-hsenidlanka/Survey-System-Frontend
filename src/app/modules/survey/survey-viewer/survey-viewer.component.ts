import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { Model } from 'survey-core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-survey-viewer',
  templateUrl: './survey-viewer.component.html',
  styleUrl: './survey-viewer.component.css',
})
export class SurveyViewerComponent implements OnInit {
  survey: any;
  surveyModel: Model;
  surveyId: string;

  constructor(
    private route: ActivatedRoute,
    private ApiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.surveyModel = new Model();
    this.surveyId = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.surveyId = params['id'];

      if (this.surveyId) {
        this.ApiService.getSurveyById(this.surveyId).subscribe(
          (surveyData) => {
            console.log(surveyData);
            this.survey = surveyData;
            const survey = new Model(surveyData);
            this.surveyModel = survey;

            // Subscribe to the onComplete event
            this.surveyModel.onComplete.add((sender) => {
              this.onSurveyComplete(sender);
            });
          },
          (error) => {
            console.error('Error fetching survey:', error);
            this.openSnackBar('Error fetching survey!');
            // Handle error as needed
          }
        );
      }
    });
  }

  onSurveyComplete(sender: { data: any }) {
    console.log(sender.data); 

    const apiData = {
      surveyId: this.surveyId, 
      answers: [sender.data],
    };

    this.ApiService.submitSurveyResponse(apiData).subscribe(
      (response) => {
        console.log('Survey response submitted successfully:', response);
        this.openSnackBar('Survey response submitted successfully!');
      },
      (error) => {
        console.error('Error submitting survey response:', error);
        this.openSnackBar('Error submitting survey response!');
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
