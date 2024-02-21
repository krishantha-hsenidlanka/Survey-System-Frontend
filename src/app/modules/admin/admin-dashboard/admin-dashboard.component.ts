import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  dashboardData: any;
  cards: any[] = [
    {
      icon: 'description',
      color: 'blue-500',
      label: 'Survey Count',
      dataKey: 'surveyCount'
    },
    {
      icon: 'assignment_turned_in',
      color: 'blue-500',
      label: 'Active Survey Count',
      dataKey: 'activeSurveyCount'
    },
    {
      icon: 'delete',
      color: 'red-500',
      label: 'Deleted Survey Count',
      dataKey: 'deletedSurveyCount'
    },
    {
      icon: 'thumb_up',
      color: 'green-500',
      label: 'Responses Count',
      dataKey: 'responsesCount'
    },
    {
      icon: 'people',
      color: 'purple-500',
      label: 'User Count',
      dataKey: 'userCount'
    },
    {
      icon: 'check_circle',
      color: 'green-500',
      label: 'Enabled User Count',
      dataKey: 'enabledUserCount'
    }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  private fetchDashboardData(): void {
    this.apiService.getDashboardSummary().subscribe(
      (data) => {
        this.dashboardData = data;
      },
      (error) => {
        console.error('Error fetching dashboard data', error);
      }
    );
  }
}
