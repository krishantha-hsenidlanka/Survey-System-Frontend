import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { UsersComponent } from './users/users.component';
import { MatIconModule } from '@angular/material/icon';
import { SurveysComponent } from './surveys/surveys.component';
import { EditUserModalComponent } from './users/edit-user-modal/edit-user-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SurveyDialogComponent } from './surveys/survey-dialog/survey-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { LogComponent } from './log/log.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AdminDashboardComponent, SideNavComponent, UsersComponent, SurveysComponent, EditUserModalComponent, SurveyDialogComponent, LogComponent],
  imports: [CommonModule, MatSidenavModule, MatProgressSpinnerModule, MatDialogModule, MatButtonModule, MatMenuModule, MatListModule, AdminDashboardRoutingModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
  ],
})
export class AdminDashboardModule {}
