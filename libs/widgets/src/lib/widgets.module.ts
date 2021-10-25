import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AkitaNgEffectsModule } from '@datorama/akita-ng-effects';
import { AlertEffects } from './alerts/alerts.state';
import { UiModule } from '@nocode/ui';
import { BasicCodeEditorComponent } from './basic-code-editor/basic-code-editor.component';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    AkitaNgEffectsModule.forFeature([AlertEffects]),
  ],
  declarations: [BasicCodeEditorComponent, AlertsComponent],
  exports: [BasicCodeEditorComponent, AlertsComponent],
})
export class WidgetsModule {}
