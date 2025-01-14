// Import necessary Angular modules and services
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../cart.service';  // Import the CartService to handle shopping cart data
import { FormsModule, NgForm } from '@angular/forms'; // Import forms-related modules
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // For sanitizing HTML content
import { CommonModule } from '@angular/common'; // Import Angular's common module

// Declare a global method for handling checkout reload
declare global {
  interface Window {
    reloadCheckoutHandler: () => void;
  }
}

// Component metadata including selector, template URL, and styles
@Component({
  selector: 'app-checkout',  // Component selector
  templateUrl: './checkout.component.html',  // Path to the template HTML
  styleUrls: ['./checkout.component.scss'],  // Path to the component's styles
  imports: [FormsModule, CommonModule],  // Import necessary modules for forms and common functionality
})
export class KlarnaCheckoutComponent implements OnInit, AfterViewInit {
  // Declare variables for storing shopping cart data and form data
  data: any;
  productCounts: any;
  
  // Initialize the form data object with default values
  checkoutFormData = {
    billingCountry: '',
    shippingCountry: '',
    useAsShippingAddress: false,
    name: '',
    organizationName: '',
    organizationNumber: '',
    streetAddress: '',
    postCode: '',
    city: '',
    shippingStreetAddress: '', // Address field for shipping
    shippingPostCode: '', // Postcode for shipping
    shippingCity: '' // City for shipping
  };

  // Variable to store the newly created order data
  nyaOrdern: any;

  // Variable to store HTML content for Klarna's checkout snippet
  klarnaHtml: SafeHtml | undefined;

  // Constructor to inject dependencies such as HttpClient, DomSanitizer, and CartService
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private cartService: CartService
  ) {}

  // ngOnInit lifecycle hook: runs when the component initializes
  ngOnInit(): void {
    // Fetch products from the shopping cart using the CartService
    this.cartService.getCartProducts().subscribe((products: any) => {
      this.data = products;  // Store the cart products
      this.productCounts = this.cartService.getProductCounts();  // Get the count of each product
    });
  }

  // Method to handle the scenario where the user opts to use the same address for billing and shipping
  onUseAsShippingAddressChange() {
    if (this.checkoutFormData.useAsShippingAddress) {
      // Copy billing address to shipping address if the user chooses to use the same address
      this.checkoutFormData.shippingCountry = this.checkoutFormData.billingCountry;
      this.checkoutFormData.shippingStreetAddress = this.checkoutFormData.streetAddress;
      this.checkoutFormData.shippingPostCode = this.checkoutFormData.postCode;
      this.checkoutFormData.shippingCity = this.checkoutFormData.city;
    } else {
      // Reset the shipping address fields if the user chooses different shipping details
      this.checkoutFormData.name = '',
      this.checkoutFormData.shippingCountry = '';
      this.checkoutFormData.shippingStreetAddress = '';
      this.checkoutFormData.shippingPostCode = '';
      this.checkoutFormData.shippingCity = '';
    }
  }

  // Method to handle the form submission and create an order
  onSubmit(formData: NgForm) {
    const products = this.data;  // Get the products in the cart
    const productCounts = this.cartService.getProductCounts();  // Get the count of each product in the cart

    // Prepare order data using form input and cart details
    const orderData = {
      billingCountry: formData.value.billingCountry,
      customerType: formData.value.customerType,
      shippingCountry: formData.value.shippingCountry,
      name: formData.value.name,
      organizationName: formData.value.organizationName,
      organizationNumber: formData.value.organizationNumber,
      streetAddress: formData.value.streetAddress,
      postCode: formData.value.postCode,
      city: formData.value.city,
      useAsShippingAddress: formData.value.useAsShippingAddress,
      orderDetails: products.map((product: { quantity: any; productName: any; price: any; }) => ({
        product: product.productName,
        quantity: productCounts[product.productName],  // Number of items for each product
        unitPrice: product.price * product.quantity,  // Total price for each product
        taxRate: 25,  // Assume a fixed tax rate of 25%
      }))
    };

    // Call the method to create an order and handle the response
    this.createOrder(orderData).then((response: any) => {
      console.log('Order created successfully:', response);  // Log success message
      this.nyaOrdern = response;  // Store the response (new order)
      this.renderSnippet();  // Render the Klarna checkout snippet
      this.cartService.clearCart();  // Clear the cart after order creation
    }).catch((error: any) => {
      console.error('Error creating order:', error);  // Log error if order creation fails
    });
  }

  // Method to create an order by sending an HTTP POST request to the backend
  createOrder(orderData: any): Promise<any> {
    return this.http.post<any>('http://localhost:3000/api/create-order', orderData).toPromise();
  }

  // Method to render the Klarna checkout snippet after an order is created
  renderSnippet(): void {
    if (this.nyaOrdern && this.nyaOrdern.html_snippet) {
      // Sanitize the HTML snippet and bind it to the view
      this.klarnaHtml = this.sanitizer.bypassSecurityTrustHtml(this.nyaOrdern.html_snippet);
      this.cdr.detectChanges();  // Trigger change detection to update the view
      const checkoutContainer = document.getElementById('checkout-container');
      if (checkoutContainer) {
        this.replaceScriptTags(checkoutContainer);  // Ensure any script tags are executed properly
      }
    }
  }

  // Method to replace script tags within the checkout container with executable scripts
  private replaceScriptTags(container: HTMLElement): void {
    const scriptTags = container.getElementsByTagName('script');
    for (let i = 0; i < scriptTags.length; i++) {
      const scriptTag = scriptTags[i];
      const newScriptTag = document.createElement('script');
      newScriptTag.type = 'text/javascript';
      if (scriptTag.src) {
        newScriptTag.src = scriptTag.src;  // Copy script source if available
      } else {
        newScriptTag.text = scriptTag.innerText;  // Copy script content if no source
      }
      scriptTag.parentNode?.replaceChild(newScriptTag, scriptTag);  // Replace old script tag with the new one
    }
  }

  // ngAfterViewInit lifecycle hook: runs after the view has been initialized
  ngAfterViewInit(): void {
    // Example logging and function call to render the Klarna snippet
    console.log('View has been initialized');
    this.renderSnippet();
  }
}

