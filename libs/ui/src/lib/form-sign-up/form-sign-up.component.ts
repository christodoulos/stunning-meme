import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup, FormBuilder } from '@ngneat/reactive-forms';

import { User } from '@nocode/data-interfaces';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

interface SignUpProfile {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'form-sign-up',
  templateUrl: './form-sign-up.component.html',
  styleUrls: ['./form-sign-up.component.css'],
})
export class FormSignUpComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    const passwordValidator = combineLatest([
      this.signUpForm.select((state) => state.password),
      this.signUpForm.select((state) => state.confirmPassword),
    ]).pipe(
      map(([password, confirmPassword]) => {
        if (password !== confirmPassword)
          this.signUpForm.get('confirmPassword').setErrors({ mustMatch: true });
        return password === confirmPassword ? null : { mustMatch: true };
      })
    );

    // this.signUpForm.validateOn(passwordValidator);
  }
  @Output() signUp: EventEmitter<User> = new EventEmitter<User>();
  signUpForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}
}
