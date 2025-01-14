import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartsComponent } from '../carts/carts.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header', // Component's selector used in HTML to display the component
  templateUrl: './header.component.html', // Path to the HTML template for the header component
  styleUrls: ['./header.component.scss'], // Path to the SCSS file for styling the header component
  encapsulation: ViewEncapsulation.None, // No view encapsulation, meaning styles will affect the whole app
  imports: [CartsComponent, RouterModule, CommonModule, HttpClientModule] // List of imported modules for the component
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {
    this.checkLoginStatus(); // Call the checkLoginStatus method when the component initializes

    // Get references to the login and logout buttons by their IDs
    const loginButton: HTMLElement | null = document.getElementById('loginButton');
    const logoutButton: HTMLElement | null = document.getElementById('logoutButton');

    // Add click event listener for the login button if it exists
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        localStorage.setItem('redirectUrl', window.location.href); // Save the current URL to redirect back after login
        console.log("Redirecting to:", 'http://localhost:3000/auth/google'); // Log the redirect URL to console
        window.location.href = 'http://localhost:3000/auth/google'; // Redirect to the Google OAuth authentication page
      });
    }

    // Add click event listener for the logout button if it exists
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        window.location.href = '/logout'; // Redirect to the logout endpoint when the logout button is clicked
      }); 
    }
  }

  // Method to check if the user is logged in or not
  checkLoginStatus(): void {
    // Check if the 'authToken' exists in localStorage, which indicates the user is logged in
    const isLoggedIn = localStorage.getItem('authToken') !== null;
    const logoutButton: HTMLElement | null = document.getElementById('logoutButton'); // Get reference to logout button

    if (isLoggedIn) {
      console.log('User is logged in'); // Log the user status
      if (logoutButton) {
        logoutButton.style.display = 'block'; // Show the logout button if the user is logged in
      }
    } else {
      console.log('User is not logged in'); // Log the user status
      if (logoutButton) {
        logoutButton.style.display = 'none'; // Hide the logout button if the user is not logged in
      }
    }
  }
}
