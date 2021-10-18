import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Filename {
  name: string;
  ext: string;
  attn: boolean;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'file-name',
  templateUrl: './file-name.component.html',
  styleUrls: ['./file-name.component.css'],
})
export class FileNameComponent {
  @Input() filenameIN: Filename = { name: '', ext: '', attn: false };
  @Output() filenameOUT: EventEmitter<Filename> = new EventEmitter<Filename>();

  onBlur() {
    this.filenameOUT.emit(this.filenameIN);
  }
}
