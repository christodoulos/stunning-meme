import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@datorama/akita-ng-effects';

import { FirebaseUserQuery } from '@nocode/auth';

import { FirestoreQuery, GnosysUserUpdateAction } from '../state';

@Component({
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css'],
})
export class UserLandingComponent implements OnDestroy {
  constructor(
    private query: FirebaseUserQuery,
    private router: Router,
    private fquery: FirestoreQuery,
    private actions: Actions
  ) {}

  uid = this.query.getValue().uid;
  displayName = this.query.getValue().displayName;
  isNewUser$ = this.fquery.isNewUser$(this.uid);
  subscription = this.isNewUser$.subscribe((isNew) => {
    if (isNew) {
      console.log(
        'USER-LANDING component: User is new will navigate to /user/signup'
      );
      this.router.navigate(['user', 'signup']);
    } else {
      console.log('USER-LANDING component: User is already signed up');
      this.actions.dispatch(GnosysUserUpdateAction({ uid: this.uid }));
    }
  });

  ngOnDestroy(): void {
    console.log('Destoying User Landing Component');
    this.subscription.unsubscribe();
  }
}
