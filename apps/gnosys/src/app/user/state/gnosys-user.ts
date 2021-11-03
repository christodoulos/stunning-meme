import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, StoreConfig, Query } from '@datorama/akita';
import {
  Actions,
  createAction,
  createEffect,
  ofType,
  props,
} from '@datorama/akita-ng-effects';
import { FirebaseUser, FirebaseUserQuery, emptyUser } from '@nocode/auth';
import { FirestoreQuery } from './firestore.query';
import { map, take, tap } from 'rxjs/operators';

// Gnosys user model

export enum GnosysRoles {
  Student,
  Parent,
  Teacher,
  Admin,
}

export interface GnosysUser extends FirebaseUser {
  role: GnosysRoles | undefined;
}

// Gnosys user Store

export function initGnosysUser(): GnosysUser {
  return {
    uid: '',
    displayName: '',
    email: '',
    photoURL: '',
    emailVerified: false,
    role: undefined,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class GnosysUserStore extends Store<GnosysUser> {
  constructor(query: FirebaseUserQuery) {
    super({ ...query.getValue() });
  }
}

// Gnosys user Service

@Injectable({ providedIn: 'root' })
export class GnosysUserService {
  constructor(private store: GnosysUserStore) {}
  updateUser(user: GnosysUser) {
    this.store.update({ ...user });
  }
}

// Gnosys user Query

@Injectable({ providedIn: 'root' })
export class GnosysUserQuery extends Query<GnosysUser> {
  constructor(protected store: GnosysUserStore) {
    super(store);
  }
  role$ = this.select((state) => state.role);
  userEmail$ = this.select((state) => state.email);
  userDisplayName$ = this.select((state) => state.displayName);
  firstName$ = this.select((state) => state.displayName?.split(' ')[0]);
  lastName$ = this.select((state) => state.displayName?.split(' ')[1]);
  userPhotoURL$ = this.select((state) => state.photoURL);
}

// Gnosys user Actions

export const GnosysUserInitAction = createAction('Gnosys Init User');

export const GnosysUserUpdateAction = createAction(
  'Gnosys User Update',
  props<{ uid: string }>()
);

export const GnosysUserSignUpAction = createAction(
  'Gnosys User Sign up',
  props<{ data: GnosysUser }>()
);

// Gnosys User Effects

@Injectable({ providedIn: 'root' })
export class GnosysUserEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private query: FirestoreQuery,
    private gnosysUserService: GnosysUserService
  ) {}

  initGnosysUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GnosysUserInitAction),
      tap(() =>
        this.gnosysUserService.updateUser({ ...emptyUser(), role: undefined })
      )
    )
  );

  updateGnosysUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GnosysUserUpdateAction),
      map((payload) => this.query.userDoc(payload.uid)),
      tap((doc) =>
        doc.pipe(take(1)).subscribe((user) => {
          console.log('Update Gnosys User Effect', user);
          this.gnosysUserService.updateUser(user as GnosysUser);
        })
      )
    )
  );

  signupUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GnosysUserSignUpAction),
      tap((payload) => {
        console.log('Signup Action Effect');
        this.query.updateUsersDoc(payload.data);
        this.router.navigate(['user']);
      })
    )
  );
}
