import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'code-toolbar',
  templateUrl: './code-toolbar.component.html',
  styleUrls: ['./code-toolbar.component.css'],
})
export class CodeToolbarComponent {
  @Output() action: EventEmitter<string> = new EventEmitter<string>();
  actions = ['document', 'download', 'upload', 'play'];

  onClick(action: string) {
    this.action.emit(action);
  }
}
