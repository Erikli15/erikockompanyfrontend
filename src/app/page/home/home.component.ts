import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: "app-Home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss"
})
export class HomeComponent implements OnInit {
  @ViewChild('bildContainer', { static: true }) bildContainer!: ElementRef;
  bilder!: NodeListOf<HTMLElement>;
  currentIndex: number = 0;

  ngOnInit(): void {
    // Hämta alla bilder från DOM:en
    this.bilder = this.bildContainer.nativeElement.querySelectorAll('.bild');

    // Visa den första bilden när sidan laddas
    this.showNextBild();

    // Byt bild var 3:e sekund
    setInterval(() => this.showNextBild(), 3000);
  }

  showNextBild(): void {
    // Ta bort "active"-klassen från den nuvarande bilden
    this.bilder[this.currentIndex].classList.remove('active');

    // Uppdatera index för nästa bild
    this.currentIndex = (this.currentIndex + 1) % this.bilder.length;

    // Lägg till "active"-klassen för nästa bild
    this.bilder[this.currentIndex].classList.add('active');
  }
}