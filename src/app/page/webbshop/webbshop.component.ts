import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from '../../cart.service'; // Import CartService to manage the cart
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Interface to define the structure of a Product object
export interface Product {
  id: number; // Unique identifier for the product
  productName: string; // Name of the product
  price: number; // Price of the product
  category: string; // Category the product belongs to
  description: string; // Detailed description of the product
  stockLevel: number; // Number of items in stock
  imgUrl: string; // URL for the product image
  quantity: number; // Quantity of the product (added for cart management)
}

@Component({
  selector: 'app-webbshop',
  templateUrl: './webbshop.component.html',
  styleUrl: './webbshop.component.scss',
  imports: [CommonModule, RouterLink], // Add CommonModule for common Angular features, and RouterLink for navigation
})
export class WebbshopComponent implements OnInit {
  products: Product[] = []; // Array to store the products

  constructor(private cartService: CartService) {} // Inject CartService to manage the cart

  ngOnInit() {
    this.fetchProducts(); // Fetch products when the component initializes
  }

  // Function to fetch products from the backend API
  fetchProducts() {
    axios
      .get('http://localhost:3000/products') // Send GET request to retrieve products from the API
      .then((response) => {
        this.products = response.data; // Set the fetched products to the 'products' array
      })
      .catch((error) => {
        console.error('Error fetching products:', error); // Log any errors that occur during the fetch
      });
  }

  // Function to handle buying a product
  buyProduct(productId: number) {
    const product = this.products.find(p => p.id === productId); // Find the product by its ID
    if (product) {
      this.cartService.addProduct(product); // Add the product to the cart via CartService
      console.log('Bought product:', product); // Log the bought product
    }
  }
}

