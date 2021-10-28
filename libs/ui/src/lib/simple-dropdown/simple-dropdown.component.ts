import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'simple-dropdown',
  templateUrl: './simple-dropdown.component.html',
})
export class SimpleDropdownComponent {
  dropdownVisible = false;
  @Input() items: Array<string> | undefined;
  @Input() label: string | undefined;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('click')
  onClick() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  onItemClick(selected: string) {
    this.selected.emit(selected);
  }
}
