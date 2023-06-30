import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAppliedComponent } from './app-applied.component';

describe('AppAppliedComponent', () => {
  let component: AppAppliedComponent;
  let fixture: ComponentFixture<AppAppliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAppliedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
