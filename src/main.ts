import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.config';  // Importera ruttkonfigurationen
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes)  // Ge routingkonfigurationen här
  ]
}).catch((err) => console.error(err));