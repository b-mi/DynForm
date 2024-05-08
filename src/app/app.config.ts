import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { firstValueFrom, tap } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService, HttpClient],
      multi: true,
    },
    provideRouter(routes),
    provideAnimationsAsync(),
    { provide: MAT_DATE_LOCALE, useValue: 'sk-SK' },
  ]
};


export function initializeApp(config: ConfigService, http: HttpClient) {
  return (): Promise<any> =>
    firstValueFrom(
      http.get('/assets/config.json')
      .pipe(tap(cf => {
        config.setValues(cf);
      }))
    );
}