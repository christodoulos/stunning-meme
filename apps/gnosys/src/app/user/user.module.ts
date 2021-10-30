import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { UserLandingComponent } from './user-landing/user-landing.component';

export const userRoutes: Route[] = [
  { path: '', component: UserLandingComponent },
  { path: 'signup', component: SignUpComponent },
];

@NgModule({
  declarations: [SignUpComponent, UserLandingComponent],
  imports: [CommonModule, RouterModule.forChild(userRoutes)],
})
export class UserModule {}
