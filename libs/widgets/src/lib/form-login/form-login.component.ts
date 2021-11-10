import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup, FormBuilder } from '@ngneat/reactive-forms';
import { Credentials } from '@nocode/data-interfaces';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLoginComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  @Output() signIn: EventEmitter<Credentials> = new EventEmitter<Credentials>();
  form = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  emitSignIn() {
    this.signIn.emit(<Credentials>this.form.value);
  }
}
