import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../fake-backend/in-memory-data.service';
import { API_URL } from './api-injection-token';
import { environment } from 'src/environments/environment';
import { MESSAGE_MAX_LENGTH } from './message-max-length-injection-token';
import { ApiUrlInterceptor } from './api-url.interceptor';
import { FakeAuthorizationInterceptor } from '../fake-backend/fake-authorization.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  imports: [
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    })
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.apiUrl
    },
    {
      provide: MESSAGE_MAX_LENGTH,
      useValue: 300
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiUrlInterceptor,
      multi: true,
      deps: [API_URL]
    },
    // The FakeAuthorizationInterceptor is being used for the sake of testing only.
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeAuthorizationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
