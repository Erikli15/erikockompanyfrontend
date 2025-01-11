import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service'; // Importera CartService
import { Product } from '../../page/webbshop/webbshop.component'; // Importera Product-gränssnittet
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.scss',
    imports: [CommonModule], // Add CommonModule here
  
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartProducts().subscribe(products => {
      this.cartProducts = products; // Uppdatera cartProducts när tjänsten ändras
    });
  }
}
