// carts.component.ts
import * as bootstrap from 'bootstrap';
import { Component, OnInit } from '@angular/core';
import { CartService, Product } from '../../cart.service';  // Importera CartService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss'],
  imports: [CommonModule] // Lägg till detta
})
export class CartsComponent implements OnInit {
  cartProducts: Product[] = [];
  productCounts: { [productName: string]: number } = {};

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Ladda varukorgen från localStorage om den finns
    this.cartService.loadCartFromStorage();
  
    // Prenumerera på varukorgens produkter
    this.cartService.getCartProducts().subscribe((products) => {
      console.log('Varukorg uppdaterad i komponenten:', products);
      this.cartProducts = products;
    });
  }

  // Lägg till produkt i varukorgen
  addToCart(product: Product): void {
    this.cartService.addProductToCart(product);
  }

  // Hämtar antalet produkter i varukorgen
  getCartItemCount(): number {
    return this.cartService.getCartItemCount();
  }

  // Öppnar modalen
  openModal(): void {
    const cartModalElement = document.getElementById('cartModal');
    if (cartModalElement) {
      const cartModal = new bootstrap.Modal(cartModalElement as Element);
      cartModal.show();
    }
  }

  // Hämtar det formatterade totalsumman
  getFormattedTotal(): string {
    const total = this.cartProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
    return total.toFixed(2) + ' kr';
  }
}