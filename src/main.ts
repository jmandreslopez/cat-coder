import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// App
import { AppModule } from '@app/app.module';

// Dependencies
declare const window: any;

// Enable Production Mode
if (window && window.config && window.config.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
