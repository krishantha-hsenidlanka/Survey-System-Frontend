import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { Model } from 'survey-core';

@Component({
  selector: 'app-survey-viewer',
  templateUrl: './survey-viewer.component.html',
  styleUrl: './survey-viewer.component.css',
})
export class SurveyViewerComponent implements OnInit {
  survey: any;
  surveyModel: Model;
  surveyId: string;

  constructor(private route: ActivatedRoute, private ApiService: ApiService) {
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
            // Handle error as needed
          }
        );
      }
    });
  }

  // Function to handle the survey completion
  onSurveyComplete(sender: { data: any }) {
    console.log(sender.data); // Log the filled data to the console

    // Prepare the data for the API call
    const apiData = {
      surveyId: this.surveyId, // Use the surveyId from the route parameters
      answers: [sender.data],
    };

    // Call the API to submit survey responses
    this.ApiService.submitSurveyResponse(apiData).subscribe(
      (response) => {
        console.log('Survey response submitted successfully:', response);
        // You can add additional handling if needed
      },
      (error) => {
        console.error('Error submitting survey response:', error);
        // Handle error as needed
      }
    );

    // Optionally, display an alert with the filled data
    alert(JSON.stringify(sender.data));
  }
}
