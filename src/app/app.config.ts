import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AboutComponent } from './page/about/about.component';
import { WebbshopComponent } from './page/webbshop/webbshop.component';
import { ContactComponent } from './page/contact/contact.component';
import { KlarnaCheckoutComponent } from './page/checkout/checkout.component';
import { ProductComponent } from './page/product/product.component';
import { CartsComponent } from './components/carts/carts.component';

// Defining the routing configuration for the Angular application
export const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // Route to the Home page
  { path: 'webbshop', component: WebbshopComponent }, // Route to the Webshop page
  { path: 'contact', component: ContactComponent }, // Route to the Contact page
  { path: 'about', component: AboutComponent }, // Route to the About page
  { path: 'product/:id', component: ProductComponent }, // Route to the Product details page (with dynamic product ID)
  { path: 'carts', component: CartsComponent }, // Route to the Cart component
  { path: 'checkout', component: KlarnaCheckoutComponent }, // Route to the Checkout page using Klarna
];
