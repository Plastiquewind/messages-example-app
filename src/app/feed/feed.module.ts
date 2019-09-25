import { NgModule } from '@angular/core';

import { FeedComponent } from './feed.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { MessagesModule } from '../messages/messages.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FeedComponent, FilterDialogComponent],
  imports: [
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MessagesModule
  ],
  exports: [FeedComponent],
  entryComponents: [FilterDialogComponent]
})
export class FeedModule {}
