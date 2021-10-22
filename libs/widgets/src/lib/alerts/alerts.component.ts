import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AlertService, AlertQuery } from './alerts.state';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsComponent implements OnInit {
  alerts$ = this.query.selectAll();
  constructor(private query: AlertQuery, private service: AlertService) {}

  ngOnInit(): void {}

  onDismiss(id: string) {
    this.service.remove(id);
  }
}
