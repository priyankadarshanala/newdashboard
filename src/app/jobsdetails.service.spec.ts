import { TestBed } from '@angular/core/testing';

import { JobsdetailsService } from './jobsdetails.service';

describe('JobsdetailsService', () => {
  let service: JobsdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobsdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
