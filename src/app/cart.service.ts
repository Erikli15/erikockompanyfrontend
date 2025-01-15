// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Product interface definition
export interface Product {
  productName: string;  // Name of the product
  price: number;        // Price of the product
  quantity: number;     // Quantity of the product in the cart
}

@Injectable({
  providedIn: 'root',  // Service is provided at the root level
})
export class CartService {

  // BehaviorSubject that holds the list of products in the cart
  public cartProductsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor() {
    // Load the cart data from localStorage when the service is instantiated
    this.loadCartFromStorage();
  }

  // Retrieve the list of products in the cart as an observable
  getCartProducts(): Observable<Product[]> {
    return this.cartProductsSubject.asObservable();
  }

  // Get the total number of items in the cart (based on unique products)
  getCartItemCount(): number {
    return this.cartProductsSubject.value.length;
  }

  // Get a count of each product by name in the cart
  getProductCounts(): { [productName: string]: number } {
    const productCounts: { [productName: string]: number } = {};  // Object to store product counts

    // Iterate over the cart items and count occurrences of each product by name
    this.cartProductsSubject.value.forEach((product) => {
      if (productCounts[product.productName]) {
        productCounts[product.productName]++;  // Increment count if product already exists
      } else {
        productCounts[product.productName] = 1;  // Initialize count if it's the first occurrence
      }
    });

    return productCounts;  // Return the object containing the count of each product
  }

  // Add a product to the cart
  addProduct(product: Product): void {
    this.addProductToCart(product);  // Calls private method to add or update the product in the cart
  }

  // Increase the quantity of a specific product in the cart
  increaseProductQuantity(productName: string): void {
    const currentCart = this.cartProductsSubject.value;
    const productIndex = currentCart.findIndex((p) => p.productName === productName);

    if (productIndex !== -1) {
      // If the product is found, increment the quantity by 1
      const updatedProduct = { ...currentCart[productIndex], quantity: currentCart[productIndex].quantity + 1 };
      currentCart[productIndex] = updatedProduct;  // Update the product in the cart array
      this.cartProductsSubject.next([...currentCart]);  // Update the BehaviorSubject state
      this.saveCartToStorage();  // Save the updated cart to localStorage
    }
  }

  // Decrease the quantity of a specific product in the cart
  decreaseProductQuantity(productName: string): void {
    const currentCart = this.cartProductsSubject.value;
    const productIndex = currentCart.findIndex((p) => p.productName === productName);

    if (productIndex !== -1 && currentCart[productIndex].quantity > 1) {
      // If the product is found and its quantity is greater than 1, decrement the quantity by 1
      const updatedProduct = { ...currentCart[productIndex], quantity: currentCart[productIndex].quantity - 1 };
      currentCart[productIndex] = updatedProduct;
      this.cartProductsSubject.next([...currentCart]);
      this.saveCartToStorage();
    } else {
      // If quantity is 1, remove the product from the cart
      this.removeProduct(productName);
    }
  }

  // Remove a product from the cart by its name
  removeProduct(productName: string): void {
    const currentCart = this.cartProductsSubject.value;
    // Filter out the product with the given name from the cart
    const updatedCart = currentCart.filter((product) => product.productName !== productName);
    this.cartProductsSubject.next(updatedCart);  // Update the cart with the new list
    this.saveCartToStorage();  // Save the updated cart to localStorage
  }

  // Private method to add a new product or update the quantity of an existing product in the cart
  public addProductToCart(product: Product): void {
    const currentCart = this.cartProductsSubject.value;
    const existingProductIndex = currentCart.findIndex((p) => p.productName === product.productName);

    if (existingProductIndex !== -1) {
      // If the product already exists in the cart, update its quantity
      const existingProduct = currentCart[existingProductIndex];
      const newQuantity = (existingProduct.quantity || 0) + (product.quantity || 1);  // Increase quantity
      currentCart[existingProductIndex] = { ...existingProduct, quantity: newQuantity };  // Update product in the cart
    } else {
      // If the product doesn't exist in the cart, add it as a new product with its specified quantity (or 1 by default)
      product.quantity = product.quantity || 1;
      currentCart.push(product);
    }

    this.cartProductsSubject.next([...currentCart]);  // Update the cart state
    this.saveCartToStorage();  // Save the updated cart to localStorage
  }

  // Clear the cart by resetting the cart to an empty array
  clearCart(): void {
    this.cartProductsSubject.next([]);  // Reset cart contents to an empty array
    this.saveCartToStorage();  // Save the empty cart to localStorage
  }

  // Save the current cart contents to localStorage
  public saveCartToStorage(): void {
    const products = this.cartProductsSubject.value;
    // Convert the cart array to a JSON string and save it in localStorage
    localStorage.setItem('cart', JSON.stringify(products));
  }

  // Load the cart contents from localStorage when the service is initialized
  public loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      // If cart data is found in localStorage, parse it and update the cart state
      const parsedCart: Product[] = JSON.parse(savedCart);
      this.cartProductsSubject.next(parsedCart);  // Update the cart state with the parsed data
    }
  }
}

