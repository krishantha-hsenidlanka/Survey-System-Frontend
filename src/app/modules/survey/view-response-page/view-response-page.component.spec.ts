import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResponsePageComponent } from './view-response-page.component';

describe('ViewResponsePageComponent', () => {
  let component: ViewResponsePageComponent;
  let fixture: ComponentFixture<ViewResponsePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewResponsePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewResponsePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
