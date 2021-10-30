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
  // [key: string]: string | boolean | undefined;
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
  constructor(private store: FirebaseUserStore) {}

  updateUser(user: FirebaseUser) {
    this.store.update({ ...user });
    this.store.setLoading(false);
  }

  setLoading(isLoading: boolean) {
    this.store.setLoading(isLoading);
  }
}

// User Query

@Injectable({ providedIn: 'root' })
export class FirebaseUserQuery extends Query<FirebaseUser> {
  loggedIn$ = this.select((state) => state.uid !== '' && state.emailVerified);
  isLoading$ = this.select((state) => state.loading);
  uid$ = this.select((state) => state.uid);
  userDisplayName$ = this.select((state) => state.displayName);
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
export const SignOutAction = createAction('SIGN OUT');

// User Effects

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private authService: FirebaseAuthService,
    private userService: FirebaseUserService
  ) {}

  initSessionEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(INIT_SESSION),
      tap(() => this.userService.updateUser(emptyUser()))
    )
  );

  googleSignInEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(GOOGLE_SIGN_IN),
      tap(() => {
        this.userService.setLoading(true);
        this.authService.googleSignIn();
      })
    )
  );

  updateSessionEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(UPDATE_SESSION),
      map((data) => data.user),
      tap((user) => this.userService.updateUser(user))
    )
  );

  signOutEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(SignOutAction),
      tap(() => this.authService.singnOut()),
      tap(() => this.userService.updateUser(emptyUser()))
    )
  );
}
