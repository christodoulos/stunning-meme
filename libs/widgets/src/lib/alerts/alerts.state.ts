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

// Alert Store

export type AlertState = EntityState<Alert>;

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'alert' })
export class AlertStore extends EntityStore<AlertState> {
  constructor() {
    super();
  }
}

// Alert Service

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(private alertStore: AlertStore) {}

  add(
    message: string,
    type: AlertType,
    header?: string,
    options?: AlertOptions
  ) {
    this.alertStore.add({ id: guid(), message, type, header, ...options });
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

export const AlertSuccessAction = createAction(
  'NEW SUCCESS ALERT',
  props<{ message: string; header?: string; options?: AlertOptions }>()
);

export const AlertErrorAction = createAction(
  'NEW ERROR ALERT',
  props<{ message: string; header?: string; options?: AlertOptions }>()
);

export const AlertInfoAction = createAction(
  'NEW INFO ALERT',
  props<{ message: string; header?: string; options?: AlertOptions }>()
);

export const AlertWarnAction = createAction(
  'NEW WARN ALERT',
  props<{ message: string; header?: string; options?: AlertOptions }>()
);

export const AlertDismissAction = createAction(
  'DISMISS ALERT',
  props<{ id: string }>()
);

// Alert Effects

@Injectable()
export class AlertEffects {
  constructor(private actions$: Actions, private alertService: AlertService) {}

  alertSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlertSuccessAction),
      tap((payload) => {
        this.alertService.add(
          payload.message,
          AlertType.Success,
          payload.header,
          payload.options
        );
      })
    )
  );

  alertErrorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlertErrorAction),
      tap((payload) => {
        this.alertService.add(
          payload.message,
          AlertType.Error,
          payload.header,
          payload.options
        );
      })
    )
  );

  alertInfoEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlertInfoAction),
      tap((payload) => {
        this.alertService.add(
          payload.message,
          AlertType.Info,
          payload.header,
          payload.options
        );
      })
    )
  );

  alertWarnEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlertWarnAction),
      tap((payload) => {
        this.alertService.add(
          payload.message,
          AlertType.Warning,
          payload.header,
          payload.options
        );
      })
    )
  );

  alertDismissEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlertDismissAction),
      tap((payload) => {
        this.alertService.remove(payload.id);
      })
    )
  );
}
