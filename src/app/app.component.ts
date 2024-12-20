// app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Endast RouterModule behövs här

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],  // Vi importerar endast RouterModule
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/about">About</a>
    </nav>
    <router-outlet></router-outlet>  <!-- Här renderas den aktuella komponenten -->
  `
})
export class AppComponent {}
