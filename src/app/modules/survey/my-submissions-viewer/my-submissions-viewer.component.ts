import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-my-submissions-viewer',
  templateUrl: './my-submissions-viewer.component.html',
  styleUrls: ['./my-submissions-viewer.component.css'],
})
export class MySubmissionsViewerComponent implements OnInit {
  responses: any[];
  loading: boolean = true;
  errorMessage: string = '';
  surveyDetailsMap: { [surveyId: string]: any } = {};
  surveyTitles: { [key: string]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.responses = [];
  }

  ngOnInit(): void {
    this.apiService.getMySubmissions().subscribe(
      (responses) => {
        this.responses = responses;
        this.loadSurveyDetails();
        this.loading = false;
      },
      (error) => {
        this.openSnackBar('Error fetching responses!');
        this.loading = false;
        if (error.status == 404) {
          this.errorMessage = 'No responses found!';
          this.openSnackBar('No responses found!');
        } else {
          this.errorMessage = 'Error fetching responses!';
          this.openSnackBar('Error fetching responses!');
        }
      }
    );
  }

  getKeys(entry: any): string[] {
    return entry ? Object.keys(entry) : [];
  }

  loadSurveyDetails() {
    // Fetch survey details for each survey ID in responses
    this.responses.forEach((response) => {
      if (response.surveyId && !this.surveyDetailsMap[response.surveyId]) {
        this.apiService.getSurveyById(response.surveyId).subscribe(
          (surveyDetails) => {
            this.surveyDetailsMap[response.surveyId] = surveyDetails;
            // Save survey title in surveyTitles map
            if (surveyDetails && surveyDetails.title) {
              this.surveyTitles[response.surveyId] = surveyDetails.title;
            }
          },
          (error) => {
            this.openSnackBar('Some surveys are not available!');
          }
        );
      }
    });
  }

  getQuestionTitle(surveyId: string, questionId: string): string {
    const surveyDetails = this.surveyDetailsMap[surveyId];
    if (surveyDetails) {
      const question = surveyDetails.pages
        .flatMap((page: { elements: any }) => page.elements)
        .find((element: { name: string }) => element.name === questionId);
      return question ? question.title : 'Unknown Question';
    }
    return 'Unknown Survey';
  }

  getSurveyTitle(surveyId: string): string {
    return this.surveyTitles[surveyId] || 'Unknown Survey';
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
