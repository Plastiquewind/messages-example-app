import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatDialogModule,
  MatIconModule,
  MatDatepickerModule,
  MAT_DATE_FORMATS,
  MatAutocompleteModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'DD.MM.YYYY'
        },
        display: {
          dateInput: 'DD.MM.YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY'
        }
      }
    }
  ]
})
export class MaterialModule {}
