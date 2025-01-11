import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from '../../cart.service'; // Importera CartService
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface Product {
  id: number;
  productName: string;
  price: number;
  category: string;
  description: string;
  stockLevel: number;
  imgUrl: string;
}

@Component({
  selector: 'app-webbshop',
  templateUrl: './webbshop.component.html',
  styleUrl: './webbshop.component.scss',
    imports: [CommonModule, RouterLink], // Add CommonModule here 
})
export class WebbshopComponent implements OnInit {
  products: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    axios
      .get('http://localhost:3000/products')
      .then((response) => {
        this.products = response.data; // Sätt produkterna från API-svaret
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }

  buyProduct(productId: number) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      this.cartService.addProduct(product); // Lägg till produkten i kundvagnen via CartService
      console.log('Köpt produkt:', product);
    }
  }
}
