import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@datorama/akita-ng-effects';
import { GnosysUserQuery, UserUpdateAction } from '../state';

@Component({
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css'],
})
export class UserLandingComponent implements OnInit {
  constructor(
    private actions: Actions,
    private query: GnosysUserQuery,
    private router: Router
  ) {
    this.query.role$.subscribe((value) => {
      if (!value) {
        this.router.navigate(['user', 'signup']);
      } else {
        this.router.navigate(['user']);
      }
    });
  }

  ngOnInit(): void {}
}
