import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AboutComponent } from './page/about/about.component';
import { WebbshopComponent } from './page/webbshop/webbshop.component';
import { ContactComponent } from './page/contact/contact.component';
import { KlarnaCheckoutComponent } from './page/checkout/checkout.component';
import { ProductComponent } from './page/product/product.component';
import { CartsComponent } from './components/carts/carts.component';


const routes: Routes = [
    { path: '', component: HomeComponent }, // Home-sidan
    { path: 'webbshop', component: WebbshopComponent }, // Webbshop-sidan
    { path: 'contact', component: ContactComponent }, // Contact-sidan
    { path: 'about', component: AboutComponent }, // About-sidan
    { path: 'product/:id', component: ProductComponent }, // Rutt till produktdetaljer
      { path: 'carts', component: CartsComponent }, // cart-comounent
    { path: 'checkout', component: KlarnaCheckoutComponent }, // Ensure this is correct

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
