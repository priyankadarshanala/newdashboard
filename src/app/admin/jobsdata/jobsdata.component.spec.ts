import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsdataComponent } from './jobsdata.component';

describe('JobsdataComponent', () => {
  let component: JobsdataComponent;
  let fixture: ComponentFixture<JobsdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
