import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './page/webbshop/webbshop.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartProductsSubject = new BehaviorSubject<Product[]>([]); // BehaviorSubject håller koll på kundvagnens innehåll
  cartProducts$ = this.cartProductsSubject.asObservable(); // Exponera cartProducts som observable för komponenter

  constructor() {}

  addProduct(product: Product) {
    const currentProducts = this.cartProductsSubject.value;
    this.cartProductsSubject.next([...currentProducts, product]); // Lägg till produkten i kundvagnen
  }

  getCartProducts() {
    return this.cartProductsSubject.asObservable(); // Returnera observable av kundvagnens produkter
  }
}
