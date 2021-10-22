import { Component } from '@angular/core';
import { FirebaseAuthService, FirebaseUserService } from '@nocode/auth';

@Component({
  selector: 'nocode-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'gnosys';
  loggedIn$ = this.auth.loggedIn$;

  userMenuVisible = false;
  overlayVisible = false;

  constructor(
    private auth: FirebaseAuthService,
    private service: FirebaseUserService
  ) {
    this.loggedIn$.subscribe((user) => {
      if (user) {
        const data = auth.parseFirebaseUser(user);
        this.service.updateUser(data);
      } else {
        console.log('logged out');
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
    this.auth.googleSignIn();
  }

  logout() {
    this.auth.singnOut();
  }
}
