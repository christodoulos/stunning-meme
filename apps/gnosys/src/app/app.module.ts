import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WidgetsModule } from '@nocode/widgets';

import { SvgIconsModule } from '@ngneat/svg-icon';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SvgIconsModule.forRoot(), WidgetsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
