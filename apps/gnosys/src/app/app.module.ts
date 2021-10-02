import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { UiModule } from '@nocode/ui';

import { SvgIconsModule } from '@ngneat/svg-icon';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SvgIconsModule.forRoot(), UiModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
