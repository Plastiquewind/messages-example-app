import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { Message } from '../shared/models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
  @Input() public isLoading: boolean;
  @Input() public disableUserLinks: boolean;

  @Input() public set reset(reset: boolean) {
    if (reset) {
      this.allMessages = [];
    }
  }

  @Input() public set messages(messages: Message[]) {
    if (messages && messages.length) {
      this.allMessages.push(...messages);

      if (!this.isVerticalScrollbarVisible()) {
        this.onBottomReach();
      }
    }
  }

  @Output() public bottomReach = new EventEmitter<number>();

  public allMessages: Message[] = [];

  public onBottomReach(): void {
    this.bottomReach.emit(this.allMessages.length);
  }

  public trackByFn(_: number, { id }: Message): number {
    return id;
  }

  private isVerticalScrollbarVisible(): boolean {
    const root =
      document.compatMode === 'BackCompat'
        ? document.body
        : document.documentElement;
    return root.scrollHeight > root.clientHeight;
  }
}
