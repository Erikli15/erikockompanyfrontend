import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  // Import necessary Angular modules for routing
import { HomeComponent } from './page/home/home.component';  // Import the Home component
import { AboutComponent } from './page/about/about.component';  // Import the About component
import { WebbshopComponent } from './page/webbshop/webbshop.component';  // Import the Webshop component
import { ContactComponent } from './page/contact/contact.component';  // Import the Contact component
import { KlarnaCheckoutComponent } from './page/checkout/checkout.component';  // Import the Klarna Checkout component
import { ProductComponent } from './page/product/product.component';  // Import the Product detail component
import { CartsComponent } from './components/carts/carts.component';  // Import the Carts component

// Define the application routes
const routes: Routes = [
    { path: '', component: HomeComponent },  // Route for the home page (empty path for root)
    { path: 'webbshop', component: WebbshopComponent },  // Route for the Webshop page
    { path: 'contact', component: ContactComponent },  // Route for the Contact page
    { path: 'about', component: AboutComponent },  // Route for the About page
    { path: 'product/:id', component: ProductComponent },  // Route for product details, with a dynamic product ID
    { path: 'carts', component: CartsComponent },  // Route for the Cart page
    { path: 'checkout', component: KlarnaCheckoutComponent },  // Route for the Checkout page (Klarna Checkout)
];

// Define the NgModule for the AppRoutingModule, which will handle routing in the application
@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Import the RouterModule and set up routes for the application
  exports: [RouterModule]  // Export RouterModule so it's available in other parts of the app
})
export class AppRoutingModule { }  // Export the AppRoutingModule class for use in the root module
