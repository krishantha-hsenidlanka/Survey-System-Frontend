import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-survey-dialog',
  templateUrl: './survey-dialog.component.html',
  styleUrls: ['./survey-dialog.component.css'],
})
export class SurveyDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SurveyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  viewSurvey(surveyId: string): void {
    window.open(`/survey/${surveyId}`, '_blank');
  }

  editSurvey(surveyId: string): void {
    window.open(`/survey/edit/${surveyId}`, '_blank');
  }

  surveyAnalytics(surveyId: string): void {
    window.open(`/responses/${surveyId}`, '_blank');
  }
}
