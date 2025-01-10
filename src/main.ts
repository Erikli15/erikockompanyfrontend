import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule

// Correct import paths
import { AppComponent } from './app/app.component';  // Correct path for AppComponent
import { AppRoutingModule } from './app/app.routes';  // Correct path for AppRoutingModule

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,  // Ensure HttpClientModule is provided
      AppRoutingModule   // Include your routing module
    )
  ]
}).catch(err => console.error(err));

