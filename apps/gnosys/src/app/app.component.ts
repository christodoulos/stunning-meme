import { Component } from '@angular/core';

import { GOOGLE_SIGN_IN, SIGN_OUT, UserQuery } from '@nocode/auth';

import { Actions } from '@datorama/akita-ng-effects';

@Component({
  selector: 'nocode-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'gnosys';
  avatar$ = this.query.userPhotoURL$;
  loggedIn$ = this.query.loggedIn$;

  userMenuVisible = false;
  overlayVisible = false;

  constructor(private query: UserQuery, private actions: Actions) {}

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
    this.actions.dispatch(SIGN_OUT());
  }
}
