import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, ExtraOptions } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ROUTER_CONFIGURATION } from '@angular/router';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled', // Restaura la posición de desplazamiento al navegar
  anchorScrolling: 'enabled',           // Habilita el desplazamiento a anclas
  scrollOffset: [0, 0]                 // Ajusta el desplazamiento si tienes un header fijo (opcional)
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    { provide: ROUTER_CONFIGURATION, useValue: routerOptions },
    BrowserModule,
    BrowserAnimationsModule,
  ],

};
