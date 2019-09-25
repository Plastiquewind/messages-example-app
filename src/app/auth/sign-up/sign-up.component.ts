import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState } from '../auth.reducer';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/app.state';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { SignUp, OpenAuthPage } from '../auth.actions';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit, OnDestroy {
  public signupForm: FormGroup;
  public submitted: boolean;

  public authState$: Observable<AuthState>;

  public get f() {
    return this.signupForm.controls;
  }

  public constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastrService: ToastrService
  ) {}

  public ngOnInit(): void {
    this.authState$ = this.store.select(selectAuthState).pipe(
      tap(
        authState =>
          authState.errorMessage &&
          this.toastrService.error(authState.errorMessage)
      ),
      untilDestroyed(this)
    );

    this.signupForm = this.formBuilder.group(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        passwordConfirmation: new FormControl('', Validators.required)
      },
      {
        validator: this.matchingValidator('password', 'passwordConfirmation')
      }
    );
  }

  public ngOnDestroy(): void {}

  public onSubmit(): void {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.store.dispatch(
      new SignUp({
        username: this.f.username.value,
        password: this.f.password.value
      })
    );
  }

  public onLoginClick(): void {
    this.store.dispatch(new OpenAuthPage());
  }

  private matchingValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
