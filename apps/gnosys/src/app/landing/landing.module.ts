import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { allIcons } from '@nocode/ui';

import { LandingComponent } from './landing/landing.component';

export const landingRoutes: Route[] = [
  {
    path: '',
    component: LandingComponent,
  },
];

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(landingRoutes),
    SvgIconsModule.forChild([...allIcons]),
  ],
})
export class LandingModule {}
