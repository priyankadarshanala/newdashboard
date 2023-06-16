import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobssectionComponent } from './jobssection.component';

describe('JobssectionComponent', () => {
  let component: JobssectionComponent;
  let fixture: ComponentFixture<JobssectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobssectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobssectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
