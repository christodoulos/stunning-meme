import { Component } from '@angular/core';

import { GOOGLE_SIGN_IN, SignOutAction, FirebaseUserQuery } from '@nocode/auth';

import { Actions } from '@datorama/akita-ng-effects';
import { Router } from '@angular/router';

@Component({
  selector: 'nocode-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'gnosys';
  items = ['Profile', 'Settings', 'Sign Out'];
  avatar$ = this.query.userPhotoURL$;
  loggedIn$ = this.query.loggedIn$;
  isLoading$ = this.query.isLoading$;

  userMenuVisible = false;
  overlayVisible = false;

  constructor(
    private query: FirebaseUserQuery,
    private actions: Actions,
    private router: Router
  ) {
    this.loggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['user']);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  toggleUserMenu() {
    this.userMenuVisible = !this.userMenuVisible;
  }

  toggleOverlayVisible() {
    this.overlayVisible = !this.overlayVisible;
  }

  login() {
    this.actions.dispatch(GOOGLE_SIGN_IN());
  }

  logout() {
    this.actions.dispatch(SignOutAction);
  }

  onSelected(item: string) {
    console.log(item);
  }
}
