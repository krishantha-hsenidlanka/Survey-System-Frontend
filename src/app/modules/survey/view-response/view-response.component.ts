import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-response',
  templateUrl: './view-response.component.html',
  styleUrls: ['./view-response.component.css']
})
export class ViewResponseComponent implements OnInit {
  surveyId: string;
  responses: any[];
  errorMessage: string;


  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) {
    this.surveyId = '';
    this.responses = [];
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.surveyId = params['id'];

      if (this.surveyId) {
        this.apiService.getResponsesBySurveyId(this.surveyId).subscribe(
          (response) => {
            this.responses = response;
            console.log('Responses:', this.responses);
          },
          (error) => {
            console.error('Error fetching responses:', error);

            if (error.status == 404) {
              this.errorMessage = 'No one responded to your survey yet';
            } else {
              this.errorMessage = 'Error fetching responses!';
            }

            this.openSnackBar(this.errorMessage);
          }
        );
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
