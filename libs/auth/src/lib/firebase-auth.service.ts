import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { AlertService, AlertType } from '@nocode/widgets';

import { FirebaseUser } from './firebase-auth.state';
import { resetStores } from '@datorama/akita';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  loggedIn$ = this.auth.authState;
  constructor(
    private auth: AngularFireAuth,
    private alertService: AlertService
  ) {}

  parseFirebaseUser(user: firebase.User): FirebaseUser {
    const { uid, email, displayName, photoURL, emailVerified } = user;
    return { uid, email, displayName, photoURL, emailVerified };
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.auth.signInWithPopup(provider);
    this.alertService.add('logged In horray!', AlertType.Success);
  }

  async singnOut() {
    await this.auth.signOut();
    resetStores();
  }
}
