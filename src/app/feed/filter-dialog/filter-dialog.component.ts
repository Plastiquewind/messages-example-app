import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDatepickerInputEvent
} from '@angular/material';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { MESSAGE_MAX_LENGTH } from '../../../app/message-max-length-injection-token';
import { MessagesFilter } from '../../../app/messages/messages-filter';
import moment from 'moment';
import { User } from '../../../app/shared/models/user';
import {
  AppState,
  selectFilterDialogAuthors,
  selectFilterDialogSelectedAuthor
} from '../../../app/app.state';
import { Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { take, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FindAuthors, SelectAuthor, Reset } from './filter-dialog.actions';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit, OnDestroy {
  public filterForm: FormGroup;
  public minDate: Date;
  public maxDate = new Date();
  public isResetVisible: boolean;

  public authors$: Observable<User[]>;

  public get f() {
    return this.filterForm.controls;
  }

  public constructor(
    private dialogRef: MatDialogRef<FilterDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MESSAGE_MAX_LENGTH) public messageMaxLength: number,
    @Inject(MAT_DIALOG_DATA) private messagesFilter: MessagesFilter
  ) {}

  public ngOnInit(): void {
    this.store
      .select(selectFilterDialogSelectedAuthor)
      .pipe(take(1))
      .subscribe(selectedAuthor => {
        this.filterForm = this.getFormGroup(selectedAuthor);
        this.isResetVisible = this.getResetButtonVisibility();
      });

    this.authors$ = this.store
      .select(selectFilterDialogAuthors)
      .pipe(untilDestroyed(this));

    this.f.author.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        untilDestroyed(this)
      )
      .subscribe(value => this.store.dispatch(new FindAuthors(value)));
  }

  public ngOnDestroy(): void {}

  public displayAuthorFn(user: User): string {
    return user && user.name;
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (!this.filterForm.invalid) {
      const from: moment.Moment = this.f.from.value || null;
      const to: moment.Moment = this.f.to.value || null;
      const author: User = this.f.author.value;

      this.store.dispatch(new SelectAuthor(author));
      this.dialogRef.close({
        ...this.messagesFilter,
        from: from ? moment(from).toDate() : null,
        text: this.f.text.value || null,
        to: to ? moment(to).toDate() : null,
        author: author ? author.id : null,
        offset: 0
      } as MessagesFilter);
    }
  }

  public onReset(): void {
    this.store.dispatch(new Reset());
    this.dialogRef.close({
      ...this.messagesFilter,
      from: null,
      text: null,
      to: null,
      author: null,
      offset: 0
    } as MessagesFilter);
  }

  public onMinDateChange(e: MatDatepickerInputEvent<moment.Moment>) {
    this.minDate = e.value.toDate();
  }

  private getFormGroup(selectedAuthor: User): FormGroup {
    return this.formBuilder.group({
      text: new FormControl(
        this.messagesFilter.text || '',
        Validators.maxLength(this.messageMaxLength)
      ),
      from: new FormControl(this.messagesFilter.from),
      to: new FormControl(this.messagesFilter.to),
      author: new FormControl(selectedAuthor)
    });
  }

  private getResetButtonVisibility(): boolean {
    return (
      !!this.messagesFilter.author ||
      !!this.messagesFilter.from ||
      !!this.messagesFilter.text ||
      !!this.messagesFilter.to
    );
  }
}
