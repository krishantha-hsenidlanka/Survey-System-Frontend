import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { Model } from 'survey-core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-survey-viewer',
  templateUrl: './survey-viewer.component.html',
  styleUrls: ['./survey-viewer.component.css'],
})
export class SurveyViewerComponent implements OnInit {
  survey: any;
  surveyModel: Model;
  surveyId: string;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.surveyModel = new Model();
    this.surveyId = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.surveyId = params['id'];

      if (this.surveyId) {
        this.apiService.getSurveyById(this.surveyId).subscribe(
          (surveyData) => {
            this.survey = surveyData;
            const survey = new Model(surveyData);
            this.surveyModel = survey;
            this.loading = false;

            this.surveyModel.onComplete.add((sender) => {
              this.onSurveyComplete(sender);
            });
          },
          (error) => {
            this.openSnackBar('Error fetching survey!');
            this.loading = false;

            if (error.status == 404) {
              this.errorMessage = 'Survey not found!';
              this.openSnackBar('Survey not found!');
            } else if (error.status == 403) {
              this.errorMessage =
                'You do not have permission to view this survey!';
              this.openSnackBar(
                'You do not have permission to view this survey!'
              );
            } else {
              this.errorMessage = 'Error fetching survey!';
              this.openSnackBar('Error fetching survey!');
            }
          }
        );
      }
    });
  }

  onSurveyComplete(sender: { data: any }) {
    const apiData = {
      surveyId: this.surveyId,
      answers: [sender.data],
    };

    this.apiService.submitSurveyResponse(apiData).subscribe(
      (response) => {
        this.openSnackBar('Survey response submitted successfully!');
      },
      (error) => {
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

  goToHome() {
    this.router.navigate(['/dashboard']);
  }
}
