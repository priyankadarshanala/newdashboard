import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatessectionComponent } from './candidatessection.component';

describe('CandidatessectionComponent', () => {
  let component: CandidatessectionComponent;
  let fixture: ComponentFixture<CandidatessectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatessectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatessectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
