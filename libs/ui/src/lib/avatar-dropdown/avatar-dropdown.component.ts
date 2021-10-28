import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'avatar-dropdown',
  templateUrl: './avatar-dropdown.component.html',
})
export class AvatarDropdownComponent {
  dropdownVisible = false;
  @Input() items: Array<string> | undefined;
  @Input() imageURL$: Observable<string> | undefined;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  constructor(private elemRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: PointerEvent) {
    if (this.elemRef.nativeElement.contains(event.target)) {
      this.dropdownVisible = !this.dropdownVisible;
    } else {
      this.dropdownVisible = false;
    }
  }

  onItemClick(item: string) {
    this.selected.emit(item);
  }
}
