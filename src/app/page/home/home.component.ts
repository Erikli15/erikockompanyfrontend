import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: "app-webbshop",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  nuvarandeBild: number = 0;
  bilder: NodeListOf<HTMLElement>;
  totaltAntalBilder: number;

  @ViewChild('bildContainer', { static: true }) bildContainer: ElementRef;

  constructor() {
    this.bilder = null!; // Initialize with null and use non-null assertion
    this.totaltAntalBilder = 0;
    this.bildContainer = null!; // Initialize with null and use non-null assertion
  }

  ngOnInit(): void {
    this.bilder = this.bildContainer.nativeElement.querySelectorAll('.bild');
    this.totaltAntalBilder = this.bilder.length;

    // Visa den första bilden när sidan laddas
    this.visaBild();

    // Byt bild varannan sekund
    setInterval(() => this.visaBild(), 2000);
  }

  visaBild(): void {
    // Ta bort "active"-klassen från alla bilder
    this.bilder.forEach((bild: HTMLElement) => {
      bild.classList.remove('active');
    });

    // Lägg till "active"-klassen för den aktuella bilden
    (this.bilder[this.nuvarandeBild] as HTMLElement).classList.add('active');

    // Uppdatera bildens index för att visa nästa bild
    this.nuvarandeBild = (this.nuvarandeBild + 1) % this.totaltAntalBilder;
  }
}