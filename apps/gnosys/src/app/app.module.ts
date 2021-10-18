import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WidgetsModule } from '@nocode/widgets';

import { SvgIconsModule } from '@ngneat/svg-icon';

import { AppComponent } from './app.component';
import { DialogModule } from '@ngneat/dialog';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SvgIconsModule.forRoot(),
    WidgetsModule,
    DialogModule.forRoot({
      sizes: {
        sm: {
          width: '300px',
          height: '250px',
        },
        // You can customize the default sizes
        // ...
      },
    }),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
