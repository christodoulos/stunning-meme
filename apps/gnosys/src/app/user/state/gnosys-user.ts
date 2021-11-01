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
import { FirebaseUser, FirebaseUserQuery } from '@nocode/auth';
import { FirestoreQuery } from './firestore.query';
import { map, tap } from 'rxjs/operators';

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

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Gnosys User', resettable: true })
export class GnosysUserStore extends Store<GnosysUser> {
  constructor(private firebaseUserQuery: FirebaseUserQuery) {
    super({ ...firebaseUserQuery.getValue() });
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

export const UserUpdateAction = createAction(
  'Gnosys User Update',
  props<{ uid: string }>()
);

export const UserSignUpAction = createAction(
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

  updateGnosysUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserUpdateAction),
      map((payload) => this.query.userDoc(payload.uid)),
      tap((doc) =>
        doc.subscribe((user) =>
          this.gnosysUserService.updateUser(user as GnosysUser)
        )
      )
    )
  );

  signupUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserSignUpAction),
      tap((payload) => {
        console.log('Signup Action Effect');
        this.query.updateUsersDoc(payload.data);
        this.router.navigate(['user']);
      })
    )
  );
}
