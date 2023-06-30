import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppJobsComponent } from './app-jobs.component';

describe('AppJobsComponent', () => {
  let component: AppJobsComponent;
  let fixture: ComponentFixture<AppJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
