import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {
    // Get the button with ID 'loginButton'
    const loginButton: HTMLElement | null = document.getElementById('loginButton');

    // Add an event listener for the click event
    if (loginButton) {
      loginButton.addEventListener('click', function() {
        // Redirect the user to the backend endpoint for Google authentication
        window.location.href = 'http://localhost:3000/auth/google';
      });
    } else {
      console.error('Knappen med ID "loginButton" hittades inte.');
    }
  }
}