// Importing necessary Angular modules and components
import { Component } from '@angular/core';  // Importing Angular's Component decorator
import { RouterModule } from '@angular/router';  // Importing Angular's RouterModule for routing functionality
import { HeaderComponent } from './components/header/header.component';  // Importing the HeaderComponent from the 'components/header' folder
import { FooterComponent } from './components/footer/footer.component';  // Importing the FooterComponent from the 'components/footer' folder

// Defining the root component of the Angular application
@Component({
  selector: 'app-root',  // Defining the selector to be used in the HTML template for this component
  standalone: true,  // Marking this component as a standalone component, meaning it can work independently without being part of a module
  imports: [RouterModule, HeaderComponent, FooterComponent],  // Importing necessary modules and components that will be used in this component
  template: `
    <app-header></app-header>  <!-- Header component is rendered here -->
    <router-outlet></router-outlet>  <!-- This is where the current page will be rendered based on the active route -->
    <app-footer></app-footer>  <!-- Footer component is rendered here -->
  `  // The template of this component, which includes the header, router outlet, and footer.
})
export class AppComponent {
  title(title: any) {  // Method called 'title', but it currently throws an error if invoked.
    throw new Error('Method not implemented.');  // This method is not implemented, and it throws an error if called
  }
}
