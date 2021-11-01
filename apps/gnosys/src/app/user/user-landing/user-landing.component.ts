import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@datorama/akita-ng-effects';
import { GnosysUserQuery, FirestoreQuery, UserUpdateAction } from '../state';

@Component({
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css'],
})
export class UserLandingComponent implements OnDestroy {
  constructor(
    private query: GnosysUserQuery,
    private router: Router,
    private fquery: FirestoreQuery,
    private actions: Actions
  ) {}

  uid = this.query.getValue().uid;
  subscription = this.fquery.isNewUser$(this.uid).subscribe((isNew) => {
    if (isNew) {
      this.router.navigate(['user', 'signup']);
    } else {
      this.router.navigate(['user']);
      this.actions.dispatch(UserUpdateAction({ uid: this.uid }));
    }
  });

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
