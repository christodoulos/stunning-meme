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
import { AngularFireModule } from '@angular/fire/compat';

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
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBuptTUnVYZPtrcJM8JK62KW5FAnYC21C0',
      authDomain: 'gnosys-4572d.firebaseapp.com',
      projectId: 'gnosys-4572d',
      storageBucket: 'gnosys-4572d.appspot.com',
      messagingSenderId: '111272556211',
      appId: '1:111272556211:web:5fa3f9b275a2912a26a2c6',
      measurementId: 'G-8CF1J5QKXC',
    }),
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
