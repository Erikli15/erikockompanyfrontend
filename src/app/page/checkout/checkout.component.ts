import { Component, OnInit, AfterViewInit, ChangeDetectorRef, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare global {
  interface Window {
    reloadCheckoutHandler: () => void;
  }
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class KlarnaCheckoutComponent implements OnInit, AfterViewInit {
  klarnaHtml: SafeHtml | undefined;
  nyaOrdern: any;
  data: any;
  counter: number | undefined;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Keep this implementation or add your initialization logic here
  }

  ngAfterViewInit(): void {
    window.reloadCheckoutHandler = () => {
      window.location.reload();
    };
  }

  initThirdPartyLibrary() {
    throw new Error('Method not implemented.');
  }

  onSubmit(formData: NgForm) {
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
      orderDetails: {
        product: 'Produkt 1',
        quantity: 1,
        unitPrice: 1000,
        taxRate: 20
      }
    };
  
    this.createOrder(orderData).then((response: any) => {
      console.log('Order created successfully:', response);
      this.nyaOrdern = response;
      this.renderSnippet();
    }).catch((error: any) => {
      console.error('Error creating order:', error);
    });
  }
  createOrder(orderData: {
    billingCountry: any;
    customerType: any;
    shippingCountry: any;
    name: any;
    organizationName: any;
    organizationNumber: any;
    streetAddress: any;
    orderDetails: { product: string; quantity: number; unitPrice: number; taxRate: number; };
  }): Promise<any> {
    // Replace this with your actual implementation
    return this.http.post<any>('http://localhost:3000/api/create-order', orderData).toPromise();
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

  renderSnippet(): void {
    if (this.nyaOrdern && this.nyaOrdern.html_snippet) {
      this.klarnaHtml = this.sanitizer.bypassSecurityTrustHtml(this.nyaOrdern.html_snippet);
      this.cdr.detectChanges(); // Uppdatera vyn
      console.log('nyaOrdern:', this.nyaOrdern);
      console.log('html_snippet:', this.nyaOrdern.html_snippet);
      // Hämta containern där HTML-snippet:en renderas
      const checkoutContainer = document.getElementById('checkout-container');
      if (checkoutContainer) {
        this.replaceScriptTags(checkoutContainer);
      }
    }
  }
}