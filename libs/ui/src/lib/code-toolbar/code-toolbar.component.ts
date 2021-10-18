import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Icon {
  name: string;
  order: number;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'code-toolbar',
  templateUrl: './code-toolbar.component.html',
  styleUrls: ['./code-toolbar.component.css'],
})
export class CodeToolbarComponent {
  @Input() toolbar = new Map<string, Icon>();
  @Output() action: EventEmitter<string> = new EventEmitter<string>();

  iconOrder(a: KeyValue<string, Icon>, b: KeyValue<string, Icon>): number {
    return a.value.order > b.value.order ? 1 : 0;
  }

  onClick(action: string) {
    this.action.emit(action);
  }
}
