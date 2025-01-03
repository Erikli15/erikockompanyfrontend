import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule], // Import CommonModule here
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {
    this.checkLoginStatus(); // Call the method

    const loginButton: HTMLElement | null = document.getElementById('loginButton');
    const logoutButton: HTMLElement | null = document.getElementById('logoutButton');

    if (loginButton) {
      loginButton.addEventListener('click', () => {
        localStorage.setItem('redirectUrl', window.location.href); // Save current URL
        console.log("Redirecting to:", 'http://localhost:3000/auth/google');

        window.location.href = 'http://localhost:3000/auth/google'; // Redirect to Google OAuth
      });
    }

    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        window.location.href = '/logout'; // Redirect to logout endpoint
      });
    }
  }

  // Define the checkLoginStatus method
  checkLoginStatus(): void {
    const isLoggedIn = localStorage.getItem('authToken') !== null;
    const logoutButton: HTMLElement | null = document.getElementById('logoutButton');

    if (isLoggedIn) {
      console.log('User  is logged in');
      if (logoutButton) {
        logoutButton.style.display = 'block'; // Visa "Logga ut"-knappen
      }
    } else {
      console.log('User  is not logged in');
      if (logoutButton) {
        logoutButton.style.display = 'none'; // Dölj "Logga ut"-knappen
      }
    }
  }
}