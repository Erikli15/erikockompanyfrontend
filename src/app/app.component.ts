// app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';  // Importera HeaderComponent
import { FooterComponent } from './components/footer/footer.component';  // Importera FooterComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],  // Lägg till RouterModule här
  template: `
    <app-header></app-header>  <!-- Header-komponenten visas här -->
    <router-outlet></router-outlet>  <!-- Här renderas den aktuella sidan -->
    <app-footer></app-footer>  <!-- Footer-komponenten visas här -->
  `
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
