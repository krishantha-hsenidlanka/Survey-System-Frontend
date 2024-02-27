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

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.surveyId = '';
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
            this.error = 'Error fetching survey configuration';
            this.loading = false;
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
        this.error = 'Error fetching survey responses';
        this.loading = false;
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

      // Use a timeout function to repeatedly attempt to hide the element
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

  hideElementWithTimeout(selector: string, totalTime: number, interval: number) {
    let currentTime = 0;

    const hideInterval = setInterval(() => {
      const element = this.el.nativeElement.querySelector(selector);
      console.log(currentTime);

      if (element) {
        // Hide the element using style.visibility
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
