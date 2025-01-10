import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import axios from "axios";

interface Product {
  id: number;
  productName: string;
  price: number;
  category: string;
  description: string;
  stockLevel: number;
  imgUrl: string;
}

@Component({
  selector: "app-webbshop",
  standalone: true,
  imports: [CommonModule, RouterModule], // Add CommonModule here
  templateUrl: "./webbshop.component.html",
  styleUrls: ["./webbshop.component.scss"]
})
export class WebbshopComponent implements OnInit {
  products: Product[] = [];

  constructor() {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        const products: Product[] = response.data;
        this.products = products; // Lagra de hämtade produkterna
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  buyProduct(productId: number) {
    console.log(`Köpt produkt med ID: ${productId}`);
    // Här kan du lägga till mer logik för att hantera köpet, t.ex. lägga till i kundvagn eller beställning
  }
  readMore(productId: number) {
    console.log(`Läs mer om produkt med ID: ${productId}`);
  }
}



