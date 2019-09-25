import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { AppState, selectAuthState } from '../../app.state';
import { Store } from '@ngrx/store';
import { Login, OpenAuthPage } from '../auth.actions';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthState } from '../auth.reducer';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public authState$: Observable<AuthState>;

  public constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.authState$ = this.store.select(selectAuthState).pipe(
      tap(
        authState =>
          authState.errorMessage &&
          this.toastrService.error(authState.errorMessage)
      ),
      tap(
        authState =>
          authState.user &&
          this.router.navigateByUrl(
            this.route.snapshot.queryParams.returnUrl || '/'
          )
      ),
      untilDestroyed(this)
    );

    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  public ngOnDestroy(): void {}

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(
      new Login({
        username: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value
      })
    );
  }

  public onSignUpClick(): void {
    this.store.dispatch(new OpenAuthPage());
  }
}
