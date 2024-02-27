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

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) {
    this.surveyId = '';
    this.responses = [];
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
            this.openSnackBar('Error fetching responses!');
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
