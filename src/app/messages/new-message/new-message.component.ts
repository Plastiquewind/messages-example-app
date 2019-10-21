import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { MESSAGE_MAX_LENGTH } from '../../core/message-max-length-injection-token';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {
  @Input() public isPosting: boolean;

  @Output() public send = new EventEmitter<string>();

  public newMessageForm: FormGroup;

  public get f() {
    return this.newMessageForm.controls;
  }

  public constructor(
    private formBuilder: FormBuilder,
    @Inject(MESSAGE_MAX_LENGTH) public messageMaxLength: number
  ) {}

  public ngOnInit(): void {
    this.newMessageForm = this.formBuilder.group({
      text: new FormControl('', Validators.maxLength(this.messageMaxLength))
    });
  }

  public onSubmit(): void {
    if (!this.newMessageForm.invalid) {
      this.send.emit(this.f.text.value);
      this.f.text.setValue('');
    }
  }
}
