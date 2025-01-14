// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Definition of the Product type if it's not already defined elsewhere
export interface Product {
  productName: string;  // Name of the product
  price: number;        // Price of the product
  quantity: number;     // Quantity of the product in the cart

  // Other properties you might have for products
}

@Injectable({
  providedIn: 'root',  // Marks this service as injectable and provides it at the root level of the app
})
export class CartService {

  // Method to add a product to the cart
  addProduct(product: Product) {
    this.addProductToCart(product);  // Calls private method to add product to the cart
  }

  // BehaviorSubject that holds the current list of products in the cart
  private cartProductsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor() {
    // Loads the cart from localStorage when the service is instantiated
    this.loadCartFromStorage();
  }

  // Retrieves the products in the cart as an observable
  getCartProducts(): Observable<Product[]> {
    return this.cartProductsSubject.asObservable();  // Exposes the cart products as an observable
  }

  // Retrieves the total number of products in the cart
  getCartItemCount(): number {
    return this.cartProductsSubject.value.length;  // Returns the length of the current cart array
  }

  // Retrieves the count of each product by name in the cart
  getProductCounts(): { [productName: string]: number } {
    const productCounts: { [productName: string]: number } = {};  // Object to store product counts

    // Iterates over all products in the cart and counts occurrences of each product by name
    this.cartProductsSubject.value.forEach((product) => {
      if (productCounts[product.productName]) {
        productCounts[product.productName]++;  // Increment count if the product already exists
      } else {
        productCounts[product.productName] = 1;  // Initialize count if it's the first occurrence
      }
    });

    return productCounts;  // Return the count object
  }

  // Private method to add a product to the cart
  private addProductToCart(product: Product): void {
    console.log('Attempting to add product to the cart:', product);

    // Retrieve the current cart contents from BehaviorSubject
    const currentCart = this.cartProductsSubject.value;
    console.log('Current cart:', currentCart);

    // Find if the product already exists in the cart
    const existingProductIndex = currentCart.findIndex((p) => p.productName === product.productName);
    console.log('Existing product index:', existingProductIndex);

    if (existingProductIndex !== -1) {
      // If the product exists in the cart, update the quantity
      const existingProduct = currentCart[existingProductIndex];
      const newQuantity = (existingProduct.quantity || 0) + (product.quantity || 1); // Add the new quantity

      console.log(`Product found, updating quantity from ${existingProduct.quantity} to ${newQuantity}`);

      // Update the product's quantity in the cart
      currentCart[existingProductIndex] = { ...existingProduct, quantity: newQuantity };
    } else {
      // If the product doesn't exist, add it with the specified quantity (or 1 if no quantity is provided)
      product.quantity = product.quantity || 1;
      console.log('Product not found, adding as new:', product);
      currentCart.push(product);
    }

    // Update the cart state and save it to localStorage
    this.cartProductsSubject.next([...currentCart]);
    this.saveCartToStorage();
    console.log('Updated cart:', currentCart);
  }

  // Method to clear the cart (empty the cart)
  clearCart(): void {
    this.cartProductsSubject.next([]);  // Reset the cart to an empty array
    this.saveCartToStorage();  // Save the empty cart to localStorage
  }

  // Method to save the cart to localStorage or other storage
  saveCartToStorage(): void {
    const products = this.cartProductsSubject.value;
    localStorage.setItem('cart', JSON.stringify(products));  // Save the cart data as a JSON string
  }

  // Method to load the cart from localStorage or other storage
  loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');  // Retrieve the cart data from localStorage
    if (savedCart) {
      const parsedCart: Product[] = JSON.parse(savedCart);  // Parse the saved cart data into an array of products
      this.cartProductsSubject.next(parsedCart);  // Update the cart's state with the loaded data
    }
  }
}
