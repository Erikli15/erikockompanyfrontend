// carts.component.ts

// Importing necessary dependencies
import * as bootstrap from 'bootstrap';  // Importing Bootstrap for modal functionality
import { Component, OnInit } from '@angular/core';  // Importing Angular Component and OnInit lifecycle hook
import { CartService, Product } from '../../cart.service';  // Importing CartService and Product model from the cart service
import { CommonModule } from '@angular/common';  // Importing CommonModule for Angular functionality

@Component({
  selector: 'app-carts',  // The component's HTML selector
  templateUrl: './carts.component.html',  // Path to the component's HTML template
  styleUrls: ['./carts.component.scss'],  // Path to the component's styles
  imports: [CommonModule]  // Importing CommonModule for the component
})
export class CartsComponent implements OnInit {
  // Declaring the cartProducts array to store products in the cart
  cartProducts: Product[] = [];

  // Declaring an object to store the quantity of each product in the cart
  productCounts: { [productName: string]: number } = {};

  // Constructor that injects the CartService to interact with the cart data
  constructor(private cartService: CartService) { }

  // ngOnInit lifecycle hook, triggered when the component is initialized
  ngOnInit(): void {
    // Load the cart data from localStorage (if available)
    this.cartService.loadCartFromStorage();
  
    // Subscribe to the cart products observable from CartService
    this.cartService.getCartProducts().subscribe((products) => {
      console.log('Cart updated in component:', products);
      this.cartProducts = products;  // Update the cartProducts array when the cart data changes
    });
  }

  // Method to add a product to the cart
  addToCart(product: Product): void {
    this.cartService.addProduct(product);
  }

  // Method to retrieve the total number of items in the cart
  getCartItemCount(): number {
    return this.cartService.getCartItemCount();
  }

  // Method to open the modal window displaying the cart
  openModal(): void {
    // Find the cart modal element in the DOM by its ID
    const cartModalElement = document.getElementById('cartModal');
    if (cartModalElement) {
      // Initialize and show the Bootstrap modal
      const cartModal = new bootstrap.Modal(cartModalElement as Element);
      cartModal.show();
    }
  }

  // Method to calculate and return the formatted total price of the products in the cart
  getFormattedTotal(): string {
    // Calculate the total sum of products in the cart
    const total = this.cartProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
    // Return the total sum formatted as a string with two decimal places and the currency symbol (kr)
    return total.toFixed(2) + ' kr';
  }
}
