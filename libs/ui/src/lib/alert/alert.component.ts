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

  onDismiss() {
    this.dismiss.emit();
  }

  bgColor(): string | undefined {
    switch (this.alertType) {
      case AlertType.Success:
        return 'bg-green-50';
      case AlertType.Error:
        return 'bg-red-50';
      case AlertType.Warning:
        return 'bg-yellow-50';
      case AlertType.Info:
        return 'bg-blue-50';
      default:
        return undefined;
    }
  }

  txtColor(): string | undefined {
    switch (this.alertType) {
      case AlertType.Success:
        return 'text-green-700';
      case AlertType.Error:
        return 'text-red-700';
      case AlertType.Warning:
        return 'text-yellow-700';
      case AlertType.Info:
        return 'text-blue-700';
      default:
        return undefined;
    }
  }

  txtColorStrong(): string | undefined {
    switch (this.alertType) {
      case AlertType.Success:
        return 'text-green-800';
      case AlertType.Error:
        return 'text-red-800';
      case AlertType.Warning:
        return 'text-yellow-800';
      case AlertType.Info:
        return 'text-blue-800';
      default:
        return undefined;
    }
  }

  iconColor(): string | undefined {
    switch (this.alertType) {
      case AlertType.Success:
        return 'text-green-400';
      case AlertType.Error:
        return 'text-red-400';
      case AlertType.Warning:
        return 'text-yellow-400';
      case AlertType.Info:
        return 'text-blue-400';
      default:
        return undefined;
    }
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
