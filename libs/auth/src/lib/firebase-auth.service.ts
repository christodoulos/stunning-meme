import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { FirebaseUser, UPDATE_SESSION } from './firebase-auth.state';
import { resetStores } from '@datorama/akita';
import { Actions } from '@datorama/akita-ng-effects';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  constructor(private auth: AngularFireAuth, private actions: Actions) {
    this.auth.authState.subscribe((data) => {
      if (data) {
        const user = this.parseFirebaseUser(data);
        this.actions.dispatch(UPDATE_SESSION({ user }));
      } else {
        resetStores();
      }
    });
  }

  parseFirebaseUser(user: firebase.User): FirebaseUser {
    const { uid, email, displayName, photoURL, emailVerified } = user;
    return { uid, email, displayName, photoURL, emailVerified };
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.auth.signInWithPopup(provider);
  }

  async singnOut() {
    await this.auth.signOut();
  }
}
