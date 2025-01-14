import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from '../../cart.service'; // Import CartService to manage the cart
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Interface to define the structure of a Product object
export interface Product {
  id: number;
  productName: string;
  price: number;
  category: string;
  description: string;
  stockLevel: number;
  imgUrl: string;
  quantity: number;
  views: number;  // Adding a 'views' field to track how often the product is viewed
}

@Component({
  selector: 'app-webbshop',
  templateUrl: './webbshop.component.html',
  styleUrl: './webbshop.component.scss',
  imports: [CommonModule, RouterLink],
})
export class WebbshopComponent implements OnInit {
  products: Product[] = [];
  mostViewedProducts: Product[] = []; // New array to store most viewed products

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.setMostViewedProducts(); // Hämta de mest visade produkterna
  }

  // Function to fetch products from the backend API
  fetchProducts() {
    axios
      .get('http://localhost:3000/products')
      .then((response) => {
        this.products = response.data;
        this.setMostViewedProducts(); // Call the function to set most viewed products
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }

  // Set the most viewed products based on views count
  setMostViewedProducts() {
    // Sort products by views in descending order and take the top 5 most viewed products
    this.mostViewedProducts = this.products
      .sort((a, b) => b.views - a.views)
      .slice(0, 5); // Limit to top 5 most viewed products
  }

  buyProduct(productId: number) {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      this.cartService.addProduct(product);
      console.log('Bought product:', product);
    }
  }
}


