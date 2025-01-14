import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-Home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  imports: [CommonModule],
})
export class HomeComponent implements OnInit {
  @ViewChild('bildContainer', { static: true }) bildContainer!: ElementRef;
  bilder!: NodeListOf<HTMLElement>;
  currentIndex: number = 0;
  mostViewedProducts: any = [];
  

  ngOnInit(): void {
    this.bilder = this.bildContainer.nativeElement.querySelectorAll('.bild');
    this.showNextBild();
    setInterval(() => this.showNextBild(), 3000);

  }

  showNextBild(): void {
    this.bilder[this.currentIndex].classList.remove('active');
    this.currentIndex = (this.currentIndex + 1) % this.bilder.length;
    this.bilder[this.currentIndex].classList.add('active');
  }
}

