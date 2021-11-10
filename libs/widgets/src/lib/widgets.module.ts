import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AkitaNgEffectsModule } from '@datorama/akita-ng-effects';
import { AlertEffects } from './alerts/alerts.state';
import { UiModule } from '@nocode/ui';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { allIcons } from '@nocode/ui';

import { BasicCodeEditorComponent } from './basic-code-editor/basic-code-editor.component';
import { AlertsComponent } from './alerts/alerts.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { FormLoginComponent } from './form-login/form-login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    AkitaNgEffectsModule.forFeature([AlertEffects]),
    SvgIconsModule.forChild([...allIcons]),
  ],
  declarations: [
    BasicCodeEditorComponent,
    AlertsComponent,
    LoadingOverlayComponent,
    FormLoginComponent,
  ],
  exports: [
    BasicCodeEditorComponent,
    AlertsComponent,
    LoadingOverlayComponent,
    FormLoginComponent,
  ],
})
export class WidgetsModule {}
