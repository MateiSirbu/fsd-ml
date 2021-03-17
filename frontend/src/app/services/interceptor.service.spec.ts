import { TestBed } from '@angular/core/testing';

import { Interceptor } from './interceptor.service';

describe('AuthInterceptorService', () => {
  let service: Interceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Interceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
