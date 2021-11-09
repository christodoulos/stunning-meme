import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { UiModule } from '@nocode/ui';
import { allIcons } from '@nocode/ui';

import { LandingComponent } from './landing/landing.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const landingRoutes: Route[] = [
  {
    path: '',
    component: LandingComponent,
  },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
];

@NgModule({
  declarations: [LandingComponent, SignUpComponent, SignInComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(landingRoutes),
    UiModule,
    SvgIconsModule.forChild([...allIcons]),
  ],
})
export class LandingModule {}
