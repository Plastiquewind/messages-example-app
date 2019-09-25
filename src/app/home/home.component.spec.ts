import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FeedModule } from '../feed/feed.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../app.state';
import { ToastrModule } from 'ngx-toastr';
import { MESSAGE_MAX_LENGTH } from '../message-max-length-injection-token';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        FeedModule,
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
