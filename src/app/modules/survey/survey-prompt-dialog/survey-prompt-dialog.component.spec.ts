import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPromptDialogComponent } from './survey-prompt-dialog.component';

describe('SurveyPromptDialogComponent', () => {
  let component: SurveyPromptDialogComponent;
  let fixture: ComponentFixture<SurveyPromptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurveyPromptDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveyPromptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
