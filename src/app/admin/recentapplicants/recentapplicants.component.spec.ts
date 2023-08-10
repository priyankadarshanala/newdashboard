import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentapplicantsComponent } from './recentapplicants.component';

describe('RecentapplicantsComponent', () => {
  let component: RecentapplicantsComponent;
  let fixture: ComponentFixture<RecentapplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentapplicantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentapplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
