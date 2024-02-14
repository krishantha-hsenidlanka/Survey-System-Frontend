import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = 'http://localhost:8080/api/surveys';

  constructor(private http: HttpClient) {}

  createSurvey(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getSurveyById(surveyId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${surveyId}`);
  }

  updateSurvey(surveyId: string, surveyData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${surveyId}`, surveyData);
  }

  getSurveysForLoggedInUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }
  
}
