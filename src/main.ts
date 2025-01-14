// Importing the necessary Angular module to bootstrap the application.
import { bootstrapApplication } from '@angular/platform-browser';

// Importing the importProvidersFrom function from Angular core to include necessary providers.
import { importProvidersFrom } from '@angular/core';

// Importing HttpClientModule to enable HTTP communication in the application.
import { HttpClientModule } from '@angular/common/http';  

// Importing the AppComponent, which is the root component of the Angular application.
import { AppComponent } from './app/app.component';  

// Importing the AppRoutingModule, which manages the application's routing configurations.
import { AppRoutingModule } from './app/app.routes';  

// Bootstrapping the Angular application with the AppComponent as the root component.
bootstrapApplication(AppComponent, {
  providers: [
    // Including the necessary providers for the application:
    importProvidersFrom(
      HttpClientModule,  // Enable HTTP client functionality for HTTP requests.
      AppRoutingModule   // Include the routing module to handle navigation.
    )
  ]
}).catch(err => console.error(err));  // Catching and logging any errors that occur during the bootstrap process.
