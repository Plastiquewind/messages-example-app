import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDialogComponent } from './filter-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../app/material/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../app/app.state';
import { MESSAGE_MAX_LENGTH } from '../../../app/message-max-length-injection-token';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FilterDialogComponent', () => {
  let component: FilterDialogComponent;
  let fixture: ComponentFixture<FilterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterDialogComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        StoreModule.forRoot(reducers, {}),
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MESSAGE_MAX_LENGTH,
          useValue: 300
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
