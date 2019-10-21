import { TestBed } from '@angular/core/testing';

import { ErrorInterceptor } from './error.interceptor';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../app.state';

describe('ErrorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers, {})],
      providers: [ErrorInterceptor]
    })
  );

  it('should be created', () => {
    const service: ErrorInterceptor = TestBed.get(ErrorInterceptor);
    expect(service).toBeTruthy();
  });
});
