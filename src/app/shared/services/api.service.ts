import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  createSurvey(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/surveys`, data);
  }

  getSurveyById(surveyId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/surveys/${surveyId}`);
  }

  updateSurvey(surveyId: string, surveyData: any): Observable<any> {
    console.log("updating Survey " , surveyData);
    return this.http.put(`${this.apiUrl}/surveys/${surveyId}`, surveyData);
  }

  generateSurvey(prompt: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/surveys/generate-survey`, prompt);
  }

  getSurveysForLoggedInUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/surveys/user`);
  }

  deleteSurveyById(surveyId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/surveys/${surveyId}`);
  }

  submitSurveyResponse(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/responses`, data);
  }

  getResponsesBySurveyId(surveyId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/responses/bySurvey/${surveyId}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/`);
  }

  getSurveysByOwnerId(ownerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/surveys/owner/${ownerId}`);
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, userData);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    console.log("Updating user", userData);
    return this.http.put(`${this.apiUrl}/users/${userId}`, userData);
  }

  getUserDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/user-details`);
  }

  changePassword(passwordData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/change-password`, passwordData);
  }

  getDashboardSummary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/dashboard-summary`);
  }

  getLogs(): Observable<string> {
    return this.http.get(`${this.apiUrl}/admin/logs`, { responseType: 'text' });
  }
  
}
