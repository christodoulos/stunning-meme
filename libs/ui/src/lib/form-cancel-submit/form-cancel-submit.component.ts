import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'form-cancel-submit',
  templateUrl: './form-cancel-submit.component.html',
  styleUrls: ['./form-cancel-submit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCancelSubmitComponent {
  @Input() paddingTop = 5;
  @Output() cancelClick: EventEmitter<boolean> = new EventEmitter(false);
  @Output() submitClick: EventEmitter<boolean> = new EventEmitter(false);

  onCancelClick() {
    this.cancelClick.emit(true);
  }

  onSubmitClick() {
    this.submitClick.emit(true);
  }
}
