// Importing the Component decorator from Angular core library
import { Component } from '@angular/core';

// The Component decorator defines metadata for the AboutComponent
@Component({
  // The 'selector' is the HTML tag used to reference this component in the template
  selector: 'app-contact',

  // The 'imports' array is empty in this case, typically used to import other modules or components
  imports: [],

  // The 'templateUrl' points to the external HTML file that contains the template for this component
  templateUrl: './about.component.html',

  // The 'styleUrl' points to the external SCSS file containing styles specific to this component
  styleUrl: './about.component.scss'
})
// The AboutComponent class serves as the logic controller for this component
export class AboutComponent {
  // The class body is empty, meaning no specific functionality is defined for this component yet
}
