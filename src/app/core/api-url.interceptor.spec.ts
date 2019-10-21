import { TestBed } from '@angular/core/testing';

import { ApiUrlInterceptor } from './api-url.interceptor';
import { API_URL } from './api-injection-token';

describe('ApiUrlInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        ApiUrlInterceptor,
        {
          provide: API_URL,
          useValue: 'http://localhost:4200'
        }
      ]
    })
  );

  it('should be created', () => {
    const service: ApiUrlInterceptor = TestBed.get(ApiUrlInterceptor);
    expect(service).toBeTruthy();
  });
});
