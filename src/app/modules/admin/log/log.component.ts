import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
})
export class LogComponent implements OnInit {
  logs: string[] = [];
  filteredLogs: string[] = [];
  loading: boolean = false;
  searchTerm: string = '';

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchLogs();
  }

  fetchLogs(): void {
    this.loading = true;
    this.apiService.getLogs().subscribe(
      (logs: string) => {
        this.logs = logs.split('\n');
        this.filterLogs();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching logs:', error);
        this.snackBar.open('Failed to fetch logs', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
        this.loading = false;
      }
    );
  }

  onSearch(): void {
    this.filterLogs();
  }

  private filterLogs(): void {
    this.filteredLogs = this.searchTerm
      ? this.logs.filter(log => log.includes(this.searchTerm))
      : this.logs;
  }
}
