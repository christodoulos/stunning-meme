import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { akitaConfig, enableAkitaProdMode } from '@datorama/akita';
akitaConfig({ resettable: true });

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
