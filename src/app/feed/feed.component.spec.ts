import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedComponent } from './feed.component';
import { MessagesModule } from '../messages/messages.module';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../app.state';
import { ToastrModule } from 'ngx-toastr';
import { MESSAGE_MAX_LENGTH } from '../core/message-max-length-injection-token';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedComponent],
      imports: [
        MessagesModule,
        MaterialModule,
        StoreModule.forRoot(reducers, {}),
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: MESSAGE_MAX_LENGTH,
          useValue: 300
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
