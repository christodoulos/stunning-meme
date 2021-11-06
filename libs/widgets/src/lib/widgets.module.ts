import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AkitaNgEffectsModule } from '@datorama/akita-ng-effects';
import { AlertEffects } from './alerts/alerts.state';
import { UiModule } from '@nocode/ui';
import { BasicCodeEditorComponent } from './basic-code-editor/basic-code-editor.component';
import { AlertsComponent } from './alerts/alerts.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    AkitaNgEffectsModule.forFeature([AlertEffects]),
  ],
  declarations: [
    BasicCodeEditorComponent,
    AlertsComponent,
    LoadingOverlayComponent,
  ],
  exports: [BasicCodeEditorComponent, AlertsComponent, LoadingOverlayComponent],
})
export class WidgetsModule {}
