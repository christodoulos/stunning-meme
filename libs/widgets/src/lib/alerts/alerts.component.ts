import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { AlertQuery, ALERT_DISMISS } from './alerts.state';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsComponent {
  alerts$ = this.query.selectAll();
  constructor(private query: AlertQuery, private actions: Actions) {}

  onDismiss(id: string) {
    this.actions.dispatch(ALERT_DISMISS({ id }));
  }
}
