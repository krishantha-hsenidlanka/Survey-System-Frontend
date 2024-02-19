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
    return this.http.put(`${this.apiUrl}/surveys/${surveyId}`, surveyData);
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
}
