import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'file-name',
  templateUrl: './file-name.component.html',
  styleUrls: ['./file-name.component.css'],
})
export class FileNameComponent {
  @Output() filename: EventEmitter<string> = new EventEmitter<string>();
  @Input() danger = false;
  onChange(value: string) {
    this.filename.emit(value);
  }
}
