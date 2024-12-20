// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component'; // Importera HomeComponent
import { AboutComponent } from './app/about/about.component'; // Importera AboutComponent
import { appRoutes } from './app/app.config'; // Importera routingkonfigurationen
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes)  // Routingkonfigurationen tillhandahålls här
  ]
}).catch((err) => console.error(err));
