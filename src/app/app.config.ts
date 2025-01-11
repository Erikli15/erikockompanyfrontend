import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AboutComponent } from './page/about/about.component';
import { WebbshopComponent } from './page/webbshop/webbshop.component';
import { ContactComponent } from './page/contact/contact.component';
import { KlarnaCheckoutComponent } from './page/checkout/checkout.component';
import { ProductComponent } from './page/product/product.component';
import { CartComponent } from './components/carts/carts.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // Home-sidan
  { path: 'webbshop', component: WebbshopComponent }, // Webbshop-sidan
  { path: 'contact', component: ContactComponent }, // Contact-sidan
  { path: 'about', component: AboutComponent }, // About-sidan
  { path: 'product/:id', component: ProductComponent }, // Rutt till produktdetaljer
  { path: 'carts', component: CartComponent }, // cart-comounent
  { path: 'checkout', component: KlarnaCheckoutComponent }, // checkout-sidan


]