import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WidgetsModule } from '@nocode/widgets';

import { SvgIconsModule } from '@ngneat/svg-icon';

import { AppComponent } from './app.component';
import { DialogModule } from '@ngneat/dialog';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SvgIconsModule.forRoot(), WidgetsModule, DialogModule.forRoot({
      sizes: {
        sm: {
          width: '300px',
          height: '250px'
        },
        // You can customize the default sizes
        // ...
      }
    })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
