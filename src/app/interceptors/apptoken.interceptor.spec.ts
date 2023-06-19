import { TestBed } from '@angular/core/testing';

import { ApptokenInterceptor } from './apptoken.interceptor';

describe('ApptokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApptokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApptokenInterceptor = TestBed.inject(ApptokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
