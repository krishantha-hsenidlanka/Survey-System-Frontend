import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
})
export class LogComponent implements OnInit {
  logs: string[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchLogs();
  }

  fetchLogs(): void {
    this.apiService.getLogs().subscribe(
      (logs: string) => {
        // Split logs into an array for display
        this.logs = logs.split('\n');
      },
      (error) => {
        console.error('Error fetching logs:', error);
      }
    );
  }
}
