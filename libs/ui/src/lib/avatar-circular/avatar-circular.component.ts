import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'avatar-circular',
  templateUrl: './avatar-circular.component.html',
  styleUrls: ['./avatar-circular.component.css'],
})
export class AvatarCircularComponent {
  @Input() imageURL$: Observable<string> | undefined;
  @Input() size = 10;
}
