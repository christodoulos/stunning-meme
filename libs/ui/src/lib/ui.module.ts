import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { allIcons } from './svg/all';

import { CodeToolbarComponent } from './code-toolbar/code-toolbar.component';
import { FileNameComponent } from './file-name/file-name.component';
import { CodemirrorComponent } from './codemirror/codemirror.component';
import { AlertComponent } from './alert/alert.component';
import { AvatarDropdownComponent } from './avatar-dropdown/avatar-dropdown.component';
import { AvatarCircularComponent } from './avatar-circular/avatar-circular.component';
import { SimpleDropdownComponent } from './simple-dropdown/simple-dropdown.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormSignUpComponent } from './form-sign-up/form-sign-up.component';
import { FormCancelSubmitComponent } from './form-cancel-submit/form-cancel-submit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SvgIconsModule.forChild([...allIcons]),
  ],
  declarations: [
    CodeToolbarComponent,
    FileNameComponent,
    CodemirrorComponent,
    AlertComponent,
    AvatarDropdownComponent,
    AvatarCircularComponent,
    SimpleDropdownComponent,
    DropdownComponent,
    FormSignUpComponent,
    FormCancelSubmitComponent,
  ],
  exports: [
    CodeToolbarComponent,
    FileNameComponent,
    CodemirrorComponent,
    AlertComponent,
    AvatarDropdownComponent,
    AvatarCircularComponent,
    SimpleDropdownComponent,
    DropdownComponent,
    FormSignUpComponent,
    FormCancelSubmitComponent,
  ],
})
export class UiModule {}
