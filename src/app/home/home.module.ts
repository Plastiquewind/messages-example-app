import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { FeedModule } from '../feed/feed.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [HomeComponent],
  imports: [FeedModule, FlexLayoutModule]
})
export class HomeModule {}
