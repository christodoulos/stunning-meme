import { Injectable } from '@angular/core';
import { Store, StoreConfig, Query } from '@datorama/akita';

export interface FirebaseUser {
  [key: string]: string | boolean | null | undefined;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  uid: string;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Firebase User', resettable: true })
export class FirebaseUserStore extends Store<FirebaseUser> {
  constructor() {
    super({});
  }
}

@Injectable({ providedIn: 'root' })
export class FirebaseUserService {
  constructor(private firebaseUserStore: FirebaseUserStore) {}
  updateUser(user: FirebaseUser) {
    this.firebaseUserStore.update({ ...user });
    this.firebaseUserStore.setLoading(false);
  }
}

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<FirebaseUser> {
  user$ = this.select();
  loggedIn$ = this.select((state) => state.uid !== '' && state.emailVerified);
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
