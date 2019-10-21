import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { environment } from './../environments/environment';
import { FeedModule } from './feed/feed.module';
import { MaterialModule } from './material/material.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './app.state';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/auth.effects';
import { FeedEffects } from './feed/feed.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserEffects } from './user/user.effects';
import { FilterDialogEffects } from './feed/filter-dialog/filter-dialog.effects';
import { HomeModule } from './home/home.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FeedModule,
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
  bootstrap: [AppComponent]
})
export class AppModule {}
