import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { FirebaseUser, UPDATE_SESSION } from './firebase-auth.state';
// import { FirestoreService } from './firestore.service';
import { Actions } from '@datorama/akita-ng-effects';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  constructor(
    private auth: AngularFireAuth,
    private actions: Actions,
    // private firestoreService: FirestoreService,
    private router: Router
  ) {
    this.auth.authState.subscribe((data) => {
      if (data) {
        const user = this.parseFirebaseUser(data);
        this.actions.dispatch(UPDATE_SESSION({ user }));
        // this.firestoreService
        //   .isNewUser$(data.uid)
        //   .subscribe((isNew) =>
        //     isNew ? this.router.navigate(['user', 'signup']) : {}
        //   );
      } else {
        this.singnOut();
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
