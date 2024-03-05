import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface MappedResponse {
  id: string;
  userId: string;
  answers: { question: string; answer: any }[];
}

@Component({
  selector: 'app-view-response',
  templateUrl: './view-response.component.html',
  styleUrls: ['./view-response.component.css'],
})
export class ViewResponseComponent implements OnInit {
  surveyId: string;
  responses: any[];
  surveyDetails: any;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.surveyId = '';
    this.responses = [];
    this.surveyDetails = {};
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.surveyId = params['id'];

      if (this.surveyId) {
        // Fetch survey details
        this.apiService.getSurveyById(this.surveyId).subscribe(
          (survey) => {
            this.surveyDetails = survey;

            // Fetch responses for the survey
            this.apiService.getResponsesBySurveyId(this.surveyId).subscribe(
              (responses) => {
                this.responses = this.mapResponseToQuestions(
                  responses,
                  this.surveyDetails
                );
              },
              (error) => {
                if (error.status == 404) {
                  this.errorMessage = 'No one responded to your survey yet';
                } else {
                  this.errorMessage = 'Error fetching responses!';
                }
                this.openSnackBar(this.errorMessage);
              }
            );
          },
          (error) => {
            this.errorMessage = 'Error fetching survey details!';
            this.openSnackBar(this.errorMessage);
          }
        );
      }
    });
  }

  mapResponseToQuestions(
    responses: any[],
    surveyDetails: any
  ): MappedResponse[] {
    return responses.map((response) => {
      const mappedResponse: MappedResponse = {
        id: response.id,
        userId: response.userId,
        answers: [],
      };

      response.answers.forEach((answer: Record<string, any>) => {
        for (const [questionId, answerValue] of Object.entries(answer)) {
          const questionDetails = this.findQuestionDetails(
            questionId,
            surveyDetails
          );

          if (questionDetails) {
            const questionTitle = questionDetails.title
            mappedResponse.answers.push({
              question: questionTitle,
              answer: answerValue,
            });
          }
        }
      });

      return mappedResponse;
    });
  }

  findQuestionDetails(questionId: string, surveyDetails: any): any {
    for (const page of surveyDetails.pages) {
      for (const element of page.elements) {
        if (element.name === questionId) {
          return { title: element.title };
        }
      }
    }
    return null;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
