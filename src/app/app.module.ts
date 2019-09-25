import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './fake-backend/in-memory-data.service';
import { FakeAuthorizationInterceptor } from './fake-backend/fake-authorization.interceptor';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { ErrorInterceptor } from './error.interceptor';
import { environment } from './../environments/environment';
import { API_URL } from './api-injection-token';
import { ApiUrlInterceptor } from './api-url.interceptor';
import { FeedModule } from './feed/feed.module';
import { MaterialModule } from './material/material.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './app.state';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/auth.effects';
import { FeedEffects } from './feed/feed.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MESSAGE_MAX_LENGTH } from './message-max-length-injection-token';
import { UserModule } from './user/user.module';
import { UserEffects } from './user/user.effects';
import { FilterDialogEffects } from './feed/filter-dialog/filter-dialog.effects';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    }),
    AuthModule,
    FeedModule,
    UserModule,
    HomeModule,
    ToastNoAnimationModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([
      AuthEffects,
      FeedEffects,
      UserEffects,
      FilterDialogEffects
    ]),
    FlexLayoutModule
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
