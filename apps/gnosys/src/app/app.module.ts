import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { WidgetsModule } from '@nocode/widgets';
import { AuthModule } from '@nocode/auth';

import { SvgIconsModule } from '@ngneat/svg-icon';

import { AppComponent } from './app.component';
import { DialogModule } from '@ngneat/dialog';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { UiModule } from '@nocode/ui';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  declarations: [AppComponent, LogoComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SvgIconsModule.forRoot({
      sizes: {
        xs: '10px',
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '25px',
        xxl: '30px',
      },
    }),
    AuthModule,
    WidgetsModule,
    UiModule,
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
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('./landing/landing.module').then((m) => m.LandingModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
    ]),
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
