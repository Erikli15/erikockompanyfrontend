// checkout.component.ts
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../cart.service';  // Importera CartService
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

declare global {
  interface Window {
    reloadCheckoutHandler: () => void;
  }
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [FormsModule, CommonModule],

})
export class KlarnaCheckoutComponent implements OnInit, AfterViewInit {
  // Varukorgens data
  data: any;
  productCounts: any;
  
  // Formulärdata
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
    shippingStreetAddress: '', // Add this property
    shippingPostCode: '', // Add this property
    shippingCity: '' // Add this property
  };
  nyaOrdern: any;
  klarnaHtml: SafeHtml | undefined;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private cartService: CartService
  ) {}
  
  ngOnInit(): void {
    this.cartService.getCartProducts().subscribe((products: any) => {
      this.data = products;
      this.productCounts = this.cartService.getProductCounts();
    });
  }

  // Hantera om användaren vill ha samma faktura och leveransadress
  onUseAsShippingAddressChange() {
    if (this.checkoutFormData.useAsShippingAddress) {
      // Kopiera faktureringsadress till leveransadress
      this.checkoutFormData.shippingCountry = this.checkoutFormData.billingCountry;
      this.checkoutFormData.shippingStreetAddress = this.checkoutFormData.streetAddress;
      this.checkoutFormData.shippingPostCode = this.checkoutFormData.postCode;
      this.checkoutFormData.shippingCity = this.checkoutFormData.city;
    } else {
      // Lämna leveransadressen för att kunna fyllas i separat
      this.checkoutFormData.name = '',
      this.checkoutFormData.shippingCountry = '';
      this.checkoutFormData.shippingStreetAddress = '';
      this.checkoutFormData.shippingPostCode = '';
      this.checkoutFormData.shippingCity = '';
    }
  }
  

  // Submit-metod för att skapa en order
  onSubmit(formData: NgForm) {
    const products = this.data;
    const productCounts = this.cartService.getProductCounts();

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
        quantity: productCounts[product.productName],
        unitPrice: product.price * product.quantity,
        taxRate: 25,
      }))
    };

    this.createOrder(orderData).then((response: any) => {
      console.log('Order created successfully:', response);
      this.nyaOrdern = response;
      this.renderSnippet();
      this.cartService.clearCart();
    }).catch((error: any) => {
      console.error('Error creating order:', error);
    });
  }

  createOrder(orderData: any): Promise<any> {
    return this.http.post<any>('http://localhost:3000/api/create-order', orderData).toPromise();
  }


  renderSnippet(): void {
    if (this.nyaOrdern && this.nyaOrdern.html_snippet) {
      this.klarnaHtml = this.sanitizer.bypassSecurityTrustHtml(this.nyaOrdern.html_snippet);
      this.cdr.detectChanges();  // Uppdatera vyn
      const checkoutContainer = document.getElementById('checkout-container');
      if (checkoutContainer) {
        this.replaceScriptTags(checkoutContainer);
      }
    }
  }

  private replaceScriptTags(container: HTMLElement): void {
    const scriptTags = container.getElementsByTagName('script');
    for (let i = 0; i < scriptTags.length; i++) {
      const scriptTag = scriptTags[i];
      const newScriptTag = document.createElement('script');
      newScriptTag.type = 'text/javascript';
      if (scriptTag.src) {
        newScriptTag.src = scriptTag.src;
      } else {
        newScriptTag.text = scriptTag.innerText;
      }
      scriptTag.parentNode?.replaceChild(newScriptTag, scriptTag);
    }
  }

  ngAfterViewInit(): void {
    // Add your logic here
    console.log('View has been initialized');
    // Example: Call a method to render the Klarna snippet
    this.renderSnippet();
  }

}
