import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'file-name',
  templateUrl: './file-name.component.html',
  styleUrls: ['./file-name.component.css'],
})
export class FileNameComponent {
  @Output() filename: EventEmitter<string> = new EventEmitter<string>();
  onChange(value: string) {
    this.filename.emit(value);
  }
}
