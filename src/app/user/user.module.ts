import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MessagesModule } from '../messages/messages.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    MessagesModule,
    UserRoutingModule
  ]
})
export class UserModule {}
