// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Definition av Product-typen om den inte finns definierad någonstans
export interface Product {
  productName: string;
  price: number;
  quantity: number; // Lägg till quantity-egenskap

  // Andra egenskaper du kan ha för produkterna
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  addProduct(product: Product) {
    this.addProductToCart(product);
  }
  private cartProductsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor() {
    this.loadCartFromStorage();
  }

  // Hämtar produkterna som en Observable
  getCartProducts(): Observable<Product[]> {
    return this.cartProductsSubject.asObservable();
  }

  // Hämtar antalet produkter i varukorgen
  getCartItemCount(): number {
    return this.cartProductsSubject.value.length;  // Längden på arrayen
  }

  getProductCounts(): { [productName: string]: number } {
    const productCounts: { [productName: string]: number } = {};
    this.cartProductsSubject.value.forEach((product) => {
      if (productCounts[product.productName]) {
        productCounts[product.productName]++;
      } else {
        productCounts[product.productName] = 1;
      }
    });
    return productCounts;
  }

// Lägg till produkt i varukorgen
addProductToCart(product: Product): void {
  console.log('Försöker lägga till produkt i varukorgen:', product);

  // Hämta den aktuella varukorgen från BehaviorSubject
  const currentCart = this.cartProductsSubject.value;
  console.log('Nuvarande varukorg:', currentCart);

  // Hitta om produkten redan finns i varukorgen
  const existingProductIndex = currentCart.findIndex((p) => p.productName === product.productName);
  console.log('Existerande produktindex:', existingProductIndex);

  if (existingProductIndex !== -1) {
    // Om produkten finns i varukorgen, uppdatera mängden
    const existingProduct = currentCart[existingProductIndex];
    const newQuantity = (existingProduct.quantity || 0) + (product.quantity || 1); // Lägg till mängden

    console.log(`Produkt hittades, uppdaterar mängden från ${existingProduct.quantity} till ${newQuantity}`);

    currentCart[existingProductIndex] = { ...existingProduct, quantity: newQuantity }; // Uppdatera produktens quantity
  } else {
    // Om produkten inte finns i varukorgen, lägg till den med den angivna mängden (eller 1 om ingen mängd anges)
    product.quantity = product.quantity || 1;
    console.log('Produkt hittades inte, lägg till som ny:', product);
    currentCart.push(product);
  }

  // Uppdatera varukorgens state och spara till localStorage
  this.cartProductsSubject.next([...currentCart]);
  this.saveCartToStorage();
  console.log('Uppdaterad varukorg:', currentCart);
}




  // Rensa varukorgen
  clearCart(): void {
    this.cartProductsSubject.next([]);
    this.saveCartToStorage();
  }

  // Spara varukorgen till localStorage eller annan lagring
  saveCartToStorage(): void {
    const products = this.cartProductsSubject.value;
    localStorage.setItem('cart', JSON.stringify(products));
  }

  // Ladda varukorgen från localStorage eller annan lagring
  loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart: Product[] = JSON.parse(savedCart);
      this.cartProductsSubject.next(parsedCart);
    }
  }
}
