// Importing the Component decorator from Angular's core library
import { Component } from '@angular/core';

// The @Component decorator is used to define metadata for the component
@Component({
  // The selector defines the name of the custom HTML tag that will be used to represent this component in templates
  selector: 'app-footer',
  
  // The imports array is currently empty, but this is where you would import other modules if needed for this component
  imports: [],

  // The templateUrl specifies the path to the HTML file associated with this component
  templateUrl: './footer.component.html',

  // The styleUrl points to the stylesheet (CSS or SCSS) for this component's styling
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  // This class defines the logic and properties for the footer component.
  // Currently, it doesn't contain any specific logic or properties.
}

