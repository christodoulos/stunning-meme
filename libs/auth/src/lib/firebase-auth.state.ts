import { Injectable } from '@angular/core';
import { Store, StoreConfig, Query } from '@datorama/akita';
import {
  Actions,
  createAction,
  createEffect,
  ofType,
  props,
} from '@datorama/akita-ng-effects';
import { map, tap } from 'rxjs/operators';
import { FirebaseAuthService } from './firebase-auth.service';
import { ALERT_SUCCESS } from '@nocode/widgets';

// User Model;

export interface FirebaseUser {
  // [key: string]: string | boolean | null | undefined;
  loading?: boolean;
  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: string;
  uid: string;
}

export function emptyUser(): FirebaseUser {
  return {
    uid: '',
    displayName: '',
    email: '',
    photoURL: '',
    emailVerified: false,
  };
}

// User Store

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Firebase User', resettable: true })
export class FirebaseUserStore extends Store<FirebaseUser> {
  constructor() {
    super(emptyUser());
  }
}

// User Service

@Injectable({ providedIn: 'root' })
export class FirebaseUserService {
  constructor(private firebaseUserStore: FirebaseUserStore) {}

  updateUser(user: FirebaseUser) {
    this.firebaseUserStore.update({ ...user });
    this.firebaseUserStore.setLoading(false);
  }

  setLoading(isLoading: boolean) {
    this.firebaseUserStore.setLoading(isLoading);
  }
}

// User Query

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<FirebaseUser> {
  user$ = this.select();
  loggedIn$ = this.select((state) => state.uid !== '' && state.emailVerified);
  isLoading$ = this.select((state) => state.loading);
  emailVerified$ = this.select((state) => state.emailVerified);
  uid$ = this.select((state) => state.uid);
  userEmail$ = this.select((state) => state.email);
  userDisplayName$ = this.select((state) => state.displayName);
  firstName$ = this.select((state) => state.displayName?.split(' ')[0]);
  lastName$ = this.select((state) => state.displayName?.split(' ')[1]);
  userPhotoURL$ = this.select((state) => state.photoURL);
  constructor(protected store: FirebaseUserStore) {
    super(store);
  }
}

// User Actions

export const INIT_SESSION = createAction('INIT SESSION');
export const GOOGLE_SIGN_IN = createAction('GOOGLE SIGN IN');
export const UPDATE_SESSION = createAction(
  'UPDATE SESSION',
  props<{ user: FirebaseUser }>()
);
export const SIGN_OUT = createAction('SIGN OUT');

// User Effects

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: FirebaseAuthService,
    private userService: FirebaseUserService
  ) {}

  initSessionEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(INIT_SESSION),
      tap(() => this.userService.updateUser(emptyUser()))
    )
  );

  googleSignInEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GOOGLE_SIGN_IN),
      tap(() => {
        this.userService.setLoading(true);
        this.authService.googleSignIn();
      })
    )
  );

  updateSessionEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UPDATE_SESSION),
        map((data) => data.user),
        tap((user) => this.userService.updateUser(user)),
        map((user) =>
          ALERT_SUCCESS({
            header: `Welcome ${user.displayName}`,
            message: 'Nice to see you again!',
            options: { autodismiss: true, duration: 5 },
          })
        )
      ),
    { dispatch: true }
  );

  signOutEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SIGN_OUT),
        tap(() => this.authService.singnOut()),
        tap(() => this.userService.updateUser(emptyUser())),
        map(() =>
          ALERT_SUCCESS({
            header: `Goodbye`,
            message: 'Looking foward to seeing you again!',
            options: { autodismiss: true, duration: 5 },
          })
        )
      ),
    { dispatch: true }
  );
}
