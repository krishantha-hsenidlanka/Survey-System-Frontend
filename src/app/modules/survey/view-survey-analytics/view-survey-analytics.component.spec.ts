import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSurveyAnalyticsComponent } from './view-survey-analytics.component';

describe('ViewSurveyAnalyticsComponent', () => {
  let component: ViewSurveyAnalyticsComponent;
  let fixture: ComponentFixture<ViewSurveyAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSurveyAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSurveyAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
