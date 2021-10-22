import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

export enum AlertType {
  Success,
  Error,
  Info,
  Warning,
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() alertType: AlertType | undefined;
  @Input() header = '';
  @Input() message = '';
  @Output() dismiss: EventEmitter<boolean> = new EventEmitter();

  get _color() {
    switch (this.alertType) {
      case AlertType.Success:
        return 'green';
      case AlertType.Error:
        return 'red';
      case AlertType.Warning:
        return 'yellow';
      case AlertType.Info:
        return 'blue';
      default:
        return '';
    }
  }

  get color() {
    return {
      bg: `bg-${this._color}-50`,
      txt: `text-${this._color}-700`,
      bold: `text-${this._color}-800`,
      icon: `text-${this._color}-400`,
      dismiss_txt: `text-${this._color}-500`,
      dismiss_hover: `bg-${this._color}-100`,
      dismiss_focus_ring_offset: `ring-offset-${this._color}-50`,
      dismiss_focus: `ring-${this._color}-600`,
    };
  }

  onDismiss() {
    this.dismiss.emit();
  }

  iconKey(): string | undefined {
    switch (this.alertType) {
      case AlertType.Success:
        return 'solid-check-circle';
      case AlertType.Error:
        return 'solid-x-circle';
      case AlertType.Warning:
        return 'solid-exclamation';
      case AlertType.Info:
        return 'solid-information-circle';
      default:
        return undefined;
    }
  }
}
