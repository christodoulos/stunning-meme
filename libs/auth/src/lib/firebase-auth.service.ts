import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { FirebaseUser, UpdateSessionAction } from './firebase-auth.state';
import { Actions } from '@datorama/akita-ng-effects';
import { resetStores } from '@datorama/akita';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  constructor(private auth: AngularFireAuth, private actions: Actions) {
    this.auth.authState.subscribe((data) => {
      if (data) {
        const user = this.parseFirebaseUser(data);
        this.actions.dispatch(UpdateSessionAction({ user }));
      } else {
        this.singnOut();
        resetStores();
      }
    });
  }

  parseFirebaseUser(user: firebase.User): FirebaseUser {
    const uid = user.uid;
    const email = user.email ? user.email : '';
    const displayName = user.displayName ? user.displayName : '';
    const photoURL = user.photoURL ? user.photoURL : '';
    const emailVerified = user.emailVerified;
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
