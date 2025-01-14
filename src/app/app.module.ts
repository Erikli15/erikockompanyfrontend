// Importing necessary modules from Angular core and browser platform
import { NgModule } from '@angular/core';  // Imports the NgModule decorator from Angular core
import { BrowserModule } from '@angular/platform-browser';  // Imports the BrowserModule for running the app in a browser

// Define the root application module using the @NgModule decorator
@NgModule({
  imports: [
    BrowserModule  // Import the BrowserModule so the app can run in a web browser
  ]
})
export class AppModule { }  // The AppModule class that serves as the root module for the Angular application

// Importing the bootstrapApplication function from Angular platform-browser to bootstrap the application
import { bootstrapApplication } from '@angular/platform-browser';  // Function to initialize the Angular application
import { AppComponent } from './app.component';  // Import the root component of the application

// Bootstrapping the Angular application using the AppComponent
bootstrapApplication(AppComponent);  // This will start the Angular app using AppComponent as the root component
