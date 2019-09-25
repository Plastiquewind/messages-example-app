import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMessageComponent } from './new-message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { MESSAGE_MAX_LENGTH } from 'src/app/message-max-length-injection-token';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewMessageComponent', () => {
  let component: NewMessageComponent;
  let fixture: ComponentFixture<NewMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewMessageComponent],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        {
          provide: MESSAGE_MAX_LENGTH,
          useValue: 300
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
