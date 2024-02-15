import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';

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
    private apiService: ApiService
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
            // Handle error as needed
          }
        );
      }
    });
  }
}
