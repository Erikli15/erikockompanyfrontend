// Importing the Component decorator from the Angular core library
import { Component } from '@angular/core';

// Defining the ContactComponent class with the Component decorator
@Component({
  // The selector specifies the custom HTML tag used to insert this component into the HTML
  selector: 'app-contact',
  
  // The imports array is currently empty, but you could add other Angular modules here if needed
  imports: [],

  // The path to the template file (HTML) for the component
  templateUrl: './contact.component.html',

  // The path to the stylesheet (SCSS) for the component
  styleUrl: './contact.component.scss'
})
// ContactComponent class definition
export class ContactComponent {
  // This is the class for the ContactComponent, where logic specific to the contact page can be added
}
