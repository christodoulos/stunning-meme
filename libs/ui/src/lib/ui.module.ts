import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { allIcons } from '../svg/all';

import { CodeToolbarComponent } from './code-toolbar/code-toolbar.component';
import { FileNameComponent } from './file-name/file-name.component';

@NgModule({
  imports: [CommonModule, FormsModule, SvgIconsModule.forChild([...allIcons])],
  declarations: [CodeToolbarComponent, FileNameComponent],
  exports: [CodeToolbarComponent, FileNameComponent],
})
export class UiModule {}
