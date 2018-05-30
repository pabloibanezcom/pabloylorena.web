import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare var ga: any;

if (environment.production) {
  enableProdMode();
}

// Google Analytics
ga('create', environment.gaID, 'auto');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
