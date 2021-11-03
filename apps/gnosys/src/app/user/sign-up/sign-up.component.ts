import { Component } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';
import {
  GnosysRoles,
  GnosysUserQuery,
  GnosysUserSignUpAction,
} from '../state/gnosys-user';
import { SignOutAction } from '@nocode/auth';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  student = GnosysRoles.Student;
  parent = GnosysRoles.Parent;
  teacher = GnosysRoles.Teacher;
  admin = GnosysRoles.Admin;
  firstname$ = this.query.firstName$;
  lastname$ = this.query.lastName$;
  email$ = this.query.userEmail$;
  firebaseUser = this.query.getValue();
  signupForm = new FormGroup({
    uid: new FormControl(this.firebaseUser.uid),
    email: new FormControl(this.firebaseUser.email),
    displayName: new FormControl(this.firebaseUser.displayName),
    emailVerified: new FormControl(this.firebaseUser.emailVerified),
    photoURL: new FormControl(this.firebaseUser.photoURL),
    role: new FormControl(undefined, [Validators.required]),
  });

  constructor(private query: GnosysUserQuery, private actions: Actions) {}

  doCancel() {
    this.actions.dispatch(SignOutAction);
  }

  doSignUp() {
    if (this.signupForm.valid) {
      console.log('SIGN-UP Component, Form Valid, will dispatch signup action');
      this.actions.dispatch(
        GnosysUserSignUpAction({ data: this.signupForm.value })
      );
    }
  }
}
