import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySubmissionsViewerComponent } from './my-submissions-viewer.component';

describe('MySubmissionsViewerComponent', () => {
  let component: MySubmissionsViewerComponent;
  let fixture: ComponentFixture<MySubmissionsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MySubmissionsViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MySubmissionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
