import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AboutComponent } from './page/about/about.component';
import { WebbshopComponent } from './page/webbshop/webbshop.component';
import { ContactComponent } from './page/contact/contact.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // Home-sidan
  { path: 'webbshop', component: WebbshopComponent }, // Webbshop-sidan
  { path: 'contact', component: ContactComponent }, // Contact-sidan
  { path: 'about', component: AboutComponent } // About-sidan
];