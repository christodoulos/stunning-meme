import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { ALERT_INFO, ALERT_SUCCESS } from '@nocode/widgets';

import { FirebaseUser } from './firebase-auth.state';
import { resetStores } from '@datorama/akita';
import { Actions } from '@datorama/akita-ng-effects';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  loggedIn$ = this.auth.authState;
  constructor(private auth: AngularFireAuth, private actions: Actions) {}

  parseFirebaseUser(user: firebase.User): FirebaseUser {
    const { uid, email, displayName, photoURL, emailVerified } = user;
    return { uid, email, displayName, photoURL, emailVerified };
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.auth.signInWithPopup(provider);
    this.actions.dispatch(
      ALERT_SUCCESS({
        message: 'Hooray',
        options: { autodismiss: true, duration: 10 },
      })
    );
    this.actions.dispatch(ALERT_INFO({ message: 'Hello how are you?' }));
  }

  async singnOut() {
    await this.auth.signOut();
    resetStores();
  }
}
