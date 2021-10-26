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

// User Mode;

export interface FirebaseUser {
  [key: string]: string | boolean | null | undefined;
  isLoading?: boolean;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  uid: string;
}

// User Store

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Firebase User', resettable: true })
export class FirebaseUserStore extends Store<FirebaseUser> {
  constructor() {
    super({});
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

export const GOOGLE_SIGN_IN = createAction('GOOGLE_SIGN_IN');
export const UPDATE_SESSION = createAction(
  'UPDATE_SESSION',
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

  googleSignInEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GOOGLE_SIGN_IN),
      tap(() => {
        this.userService.setLoading(true);
        this.authService.googleSignIn();
      })
    )
  );

  updateSessionEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UPDATE_SESSION),
      map((data) => data.user),
      tap((user) => {
        this.userService.updateUser(user);
      })
    )
  );

  signOutEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SIGN_OUT),
      tap(() => this.authService.singnOut())
    )
  );
}
