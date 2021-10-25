import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AkitaNgEffectsModule } from '@datorama/akita-ng-effects';

import { UserEffects } from './firebase-auth.state';

@NgModule({
  imports: [CommonModule, AkitaNgEffectsModule.forFeature([UserEffects])],
})
export class AuthModule {}
