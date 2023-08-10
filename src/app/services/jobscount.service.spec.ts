import { TestBed } from '@angular/core/testing';

import { JobscountService } from './jobscount.service';

describe('JobscountService', () => {
  let service: JobscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobscountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
