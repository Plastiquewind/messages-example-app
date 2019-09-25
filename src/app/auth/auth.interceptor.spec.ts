import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../app.state';

describe('AuthInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers, {})],
      providers: [AuthInterceptor]
    })
  );

  it('should be created', () => {
    const service: AuthInterceptor = TestBed.get(AuthInterceptor);
    expect(service).toBeTruthy();
  });
});
