import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { VisualizationPanel } from 'survey-analytics';
import { MatrixPlotly, SelectBasePlotly } from 'survey-analytics';
import { Model } from 'survey-core';
import 'survey-analytics/survey.analytics.css';

MatrixPlotly.types = ['stackedbar', 'bar', 'pie', 'doughnut'];
SelectBasePlotly.types = ['doughnut', 'bar', 'pie', 'scatter'];

@Component({
  selector: 'app-view-survey-analytics',
  templateUrl: './view-survey-analytics.component.html',
  styleUrls: ['./view-survey-analytics.component.css'],
})
export class ViewSurveyAnalyticsComponent implements OnInit {
  surveyId: string;
  loading: boolean = true;
  error: string | null = null;
  surveyData: any;
  responseData: any[] = [];
  matIconName: string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.surveyId = '';
    this.matIconName = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.surveyId = params['id'];

      if (this.surveyId) {
        this.apiService.getSurveyById(this.surveyId).subscribe(
          (surveyConfig) => {
            this.surveyData = surveyConfig;
            console.log('Survey configuration:', this.surveyData);
            this.fetchSurveyResponses();
          },
          (error) => {
            this.handleErrorResponse(error);

          }
        );
      }
    });
  }

  fetchSurveyResponses() {
    this.apiService.getResponsesBySurveyId(this.surveyId).subscribe(
      (responses) => {
        this.responseData = this.extractAnswers(responses);
        this.loading = false;
        console.log('Responses:', this.responseData);
        this.renderSurveyData();
      },
      (error) => {
        this.handleErrorResponse(error);
      }
    );
  }

  renderSurveyData() {
    const survey = new Model(this.surveyData);
    setTimeout(() => {
      const vizPanel = new VisualizationPanel(
        survey.getAllQuestions(),
        this.responseData
      );
      vizPanel.render('surveyDashboardContainer');

      // console.log('Before removal:', this.el.nativeElement.innerHTML);

      this.hideElementWithTimeout('.sa-commercial', 100000, 0.1);
    }, 1000);
  }

  extractAnswers(responses: any[]): any[] {
    const answers: any[] = [];
    responses.forEach((response) => {
      if (response.answers && response.answers.length > 0) {
        response.answers.forEach((answer: any) => {
          answers.push(answer);
        });
      }
    });
    return answers;
  }

  private handleErrorResponse(error: any) {
    if (error.status === 404) {
      this.handleError('No one responded to your survey yet', 'error_outline');
    } else if (error.status === 403) {
      this.handleError('You do not have permission', 'block');
    } else if (error.status === 401) {
      this.handleError('Unauthorized access', 'vpn_key');
    } else {
      this.handleError('Error fetching survey responses', 'error');
    }
  }

  private handleError(errorMessage: string, matIconName: string) {
    this.error = errorMessage;
    this.matIconName = matIconName; 
    this.loading = false;
  }

  hideElementWithTimeout(selector: string, totalTime: number, interval: number) {
    let currentTime = 0;

    const hideInterval = setInterval(() => {
      const element = this.el.nativeElement.querySelector(selector);
      console.log(currentTime);

      if (element) {
        element.style.visibility = 'hidden';
        element.style.display = 'none';
        // console.log('Element found and hidden:', this.el.nativeElement.innerHTML);
        clearInterval(hideInterval); // Stop the interval once the element is found and hidden
      } else {
        currentTime += interval;
        interval += interval;
        if (currentTime >= totalTime) {
          console.log('Element not found within the specified time.');
          clearInterval(hideInterval); // Stop the interval if the specified time is exceeded
        }
      }
    }, interval);
  }
}
