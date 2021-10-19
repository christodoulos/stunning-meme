import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { FirebaseUser } from './firebase-auth.state';
import { resetStores } from '@datorama/akita';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  loggedIn$ = this.auth.authState;
  constructor(private auth: AngularFireAuth) {}

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
    resetStores();
  }
}
