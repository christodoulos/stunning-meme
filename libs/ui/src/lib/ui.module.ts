import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { allIcons } from '../svg/all';

import { CodeToolbarComponent } from './code-toolbar/code-toolbar.component';

@NgModule({
  imports: [CommonModule, SvgIconsModule.forChild([...allIcons])],
  declarations: [CodeToolbarComponent],
  exports: [CodeToolbarComponent],
})
export class UiModule {}
