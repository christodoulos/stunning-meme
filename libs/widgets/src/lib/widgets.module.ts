import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiModule } from '@nocode/ui';
import { VendorModule } from '@nocode/vendor';
import { BasicCodeEditorComponent } from './basic-code-editor/basic-code-editor.component';

@NgModule({
  imports: [CommonModule, UiModule, VendorModule],
  declarations: [
    BasicCodeEditorComponent
  ],
  exports: [
    BasicCodeEditorComponent
  ],
})
export class WidgetsModule {}
