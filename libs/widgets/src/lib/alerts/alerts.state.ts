import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  guid,
  QueryEntity,
} from '@datorama/akita';
import {
  createAction,
  props,
  Actions,
  createEffect,
  ofType,
} from '@datorama/akita-ng-effects';
import { AlertType } from '@nocode/ui';
import { tap } from 'rxjs/operators';

export { AlertType } from '@nocode/ui';

// Alert Model

export interface AlertOptions {
  autodismiss?: boolean;
  duration?: number;
  keepAfterRouteChange?: boolean;
}

export interface Alert {
  id: string;
  type: AlertType;
  header?: string;
  message: string;
  autodismiss?: boolean;
  duration?: number;
  keepAfterRouteChange?: boolean;
}

// Alert State

export type AlertState = EntityState<Alert>;

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'alert', resettable: true })
export class AlertStore extends EntityStore<AlertState> {
  constructor() {
    super();
  }
}

// Alert Service

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(private alertStore: AlertStore) {}

  add(message: string, type: AlertType, options?: AlertOptions) {
    this.alertStore.add({ id: guid(), message, type, ...options });
  }

  update(id: string, alert: AlertOptions) {
    this.alertStore.update(id, alert);
  }

  remove(id: string) {
    this.alertStore.remove(id);
  }
}

// Alert Query

@Injectable({ providedIn: 'root' })
export class AlertQuery extends QueryEntity<AlertState> {
  constructor(protected store: AlertStore) {
    super(store);
  }
}

// Alert Actions

export const ALERT_SUCCESS = createAction(
  'NEW success',
  props<{ message: string; options: AlertOptions }>()
);

export const ALERT_ERROR = createAction(
  'NEW error',
  props<{ message: string; options?: AlertOptions }>()
);

export const ALERT_INFO = createAction(
  'NEW info',
  props<{ message: string; options?: AlertOptions }>()
);

export const ALERT_WARN = createAction(
  'NEW warn',
  props<{ message: string; options?: AlertOptions }>()
);

export const ALERT_DISMISS = createAction('DISMISS', props<{ id: string }>());

// Alert Effects

@Injectable()
export class AlertEffects {
  constructor(private actions$: Actions, private alertService: AlertService) {}

  alertSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ALERT_SUCCESS),
      tap((payload) => {
        console.log('lala');
        this.alertService.add(
          payload.message,
          AlertType.Success,
          payload.options
        );
      })
    )
  );

  alertErrorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ALERT_ERROR),
      tap((payload) => {
        this.alertService.add(
          payload.message,
          AlertType.Error,
          payload.options
        );
      })
    )
  );

  alertInfoEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ALERT_INFO),
      tap((payload) => {
        this.alertService.add(payload.message, AlertType.Info, payload.options);
      })
    )
  );

  alertWarnEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ALERT_WARN),
      tap((payload) => {
        this.alertService.add(
          payload.message,
          AlertType.Warning,
          payload.options
        );
      })
    )
  );

  alertDismissEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ALERT_DISMISS),
      tap((payload) => {
        this.alertService.remove(payload.id);
      })
    )
  );
}
