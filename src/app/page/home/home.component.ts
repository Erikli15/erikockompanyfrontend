import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: "app-Home", // The selector to identify the component in the template
  templateUrl: "./home.component.html", // Path to the HTML template
  styleUrl: "./home.component.scss" // Path to the SCSS stylesheet
})
export class HomeComponent implements OnInit {
  @ViewChild('bildContainer', { static: true }) bildContainer!: ElementRef; // Access the DOM element with the reference 'bildContainer'
  bilder!: NodeListOf<HTMLElement>; // Declare a variable to store the list of images (DOM elements)
  currentIndex: number = 0; // Initialize the index to keep track of the currently displayed image

  ngOnInit(): void {
    // Get all the images from the DOM inside the 'bildContainer' element
    this.bilder = this.bildContainer.nativeElement.querySelectorAll('.bild');

    // Show the first image when the page loads
    this.showNextBild();

    // Change the image every 3 seconds
    setInterval(() => this.showNextBild(), 3000);
  }

  showNextBild(): void {
    // Remove the "active" class from the currently displayed image
    this.bilder[this.currentIndex].classList.remove('active');

    // Update the index to point to the next image
    this.currentIndex = (this.currentIndex + 1) % this.bilder.length;

    // Add the "active" class to the next image
    this.bilder[this.currentIndex].classList.add('active');
  }
}
