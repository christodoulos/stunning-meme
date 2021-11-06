import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GoogleSignInAction,
  SignOutAction,
  FirebaseUserQuery,
} from '@nocode/auth';

import { GnosysUserInitAction } from './user/state';

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
  hello$ = this.http.get('/api');

  userMenuVisible = false;
  overlayVisible = false;

  constructor(
    private query: FirebaseUserQuery,
    private actions: Actions,
    private router: Router,
    private http: HttpClient
  ) {
    console.log('APP component');
    this.loggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        console.log('APP component user is logged in');
        this.router.navigate(['user']);
      } else {
        console.log('APP component user is logged out');
        this.router.navigate(['']);
        this.actions.dispatch(GnosysUserInitAction());
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
    console.log('APP component will dispatch GoogleSignInAction');
    this.actions.dispatch(GoogleSignInAction());
  }

  logout() {
    console.log('APP component will dispatch SignOutAction');
    this.actions.dispatch(SignOutAction());
  }

  onSelected(item: string) {
    switch (item) {
      case 'Sign Out':
        this.logout();
        break;

      default:
        break;
    }
    console.log(item);
  }
}
