import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../../survey/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ApiService } from '../../../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-survey-dialog',
  templateUrl: './survey-dialog.component.html',
  styleUrls: ['./survey-dialog.component.css'],
})
export class SurveyDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SurveyDialogComponent>,
    private dialog: MatDialog,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
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

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  deleteSurvey(surveyId: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.apiService.deleteSurveyById(surveyId).subscribe((response) => {
          this.openSnackBar(response.message);
        });
      }
    });
  }
}
