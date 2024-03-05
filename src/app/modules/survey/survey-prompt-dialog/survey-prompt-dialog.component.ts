import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../shared/services/api.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-survey-prompt-dialog',
  templateUrl: './survey-prompt-dialog.component.html',
  styleUrls: ['./survey-prompt-dialog.component.css'],
})
export class SurveyPromptDialogComponent {
  prompt: string = '';
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<SurveyPromptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private snackBar: MatSnackBar
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
        this.openSnackBar('Error generating survey. Please try again.');
      }
    );
  }

  openSnackBar(message: string) {
    const config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-danger'], 
    };
    this.snackBar.open(message, 'Close', config);
  }
}
