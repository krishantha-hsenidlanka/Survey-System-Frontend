import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-survey-prompt-dialog',
  templateUrl: './survey-prompt-dialog.component.html',
  styleUrls: ['./survey-prompt-dialog.component.css']
})
export class SurveyPromptDialogComponent {
  prompt: string = '';
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<SurveyPromptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  generateSurvey() {
    this.loading = true;
    this.apiService.generateSurvey(this.prompt).subscribe(
      (response) => {
        this.loading = false;
        this.dialogRef.close(response.id);
      },
      (error) => {
        this.loading = false;
        console.error('Error generating survey:', error);
        // Handle error here if needed
      }
    );
  }
}
