import { Component } from "@angular/core";
import axios from "axios";

interface Product {
    id: number;
    productName: string;
    price: number;
    description: string;
    category: string;
    stockLevel: number;
    imgUrl: string;
}

@Component({
    selector: "app-webbshop",
    templateUrl: "./webbshop.component.html",
    styleUrls: ["./webbshop.component.scss"]
})
export class WebbshopComponent {
    products: Product[];

    constructor() {
        this.products = [];
        this.fetchProducts();
    }

    fetchProducts() {
        axios.get("http://localhost:3000/products")
            .then(response => {
                const products: Product[] = response.data; // Hämta produkterna från svaret
                this.processProducts(products); // Anropa metoden för att bearbeta produkterna
            })
            .catch(error => {
                console.error("Error fetching products:", error); // Hantera eventuella fel
            });
    }

    processProducts(products: Product[]) {
      const mainElement = document.getElementById("mainDockment") as HTMLDivElement // Hitta main-elementet
    
      mainElement.innerHTML = "";

      products.forEach((product: Product) => {
          // Skapa ett nytt section-element för produkten
          const productCard = document.createElement("section");
          productCard.className = "product-card";
  
          // Skapa produktens bild
          const productImage = document.createElement("article");
          productImage.className = "product-image";
          const imageSpan = document.createElement("span");
          imageSpan.className = "image";
          const imgElement = document.createElement("img");
          imgElement.className = "img";
          imgElement.src = product.imgUrl; // Sätt bildens URL
          imgElement.alt = "Bild saknas"; // Sätt bildens alternativtext
          imageSpan.appendChild(imgElement);
          productImage.appendChild(imageSpan);
          productCard.appendChild(productImage);
  
          // Skapa produktens information
          const productInfo = document.createElement("article");
          productInfo.className = "product-info";
          const productclassNameElement = document.createElement("p");
          productclassNameElement.className = "product-className";
          productclassNameElement.textContent = `className: ${product.id}`; // Sätt produktens className
          const productNameElement = document.createElement("h2");
          productNameElement.className = "product-name";
          productNameElement.textContent = product.productName; // Sätt produktens namn
          const productPriceElement = document.createElement("p");
          productPriceElement.className = "product-price";
          productPriceElement.textContent = `Pris: ${product.price} kr`; // Sätt produktens pris
  
          productInfo.appendChild(productclassNameElement);
          productInfo.appendChild(productNameElement);
          productInfo.appendChild(productPriceElement);
          productCard.appendChild(productInfo);
  
          // Skapa köp-knappen
          const buyButton = document.createElement("button");
          buyButton.className = "buy-button";
          buyButton.textContent = "Köp"; // Sätt texten på knappen
          // Här kan du lägga till en event listener för knappen om du vill
          buyButton.addEventListener("click", () => {
              console.log(`Köpt produkt med className: ${product.id}`);
              // Här kan du lägga till logik för att hantera köp
          });
  
          productCard.appendChild(buyButton);
  
          // Lägg till produktkortet i main-elementet
          mainElement.appendChild(productCard);
      });
      document.body.appendChild(mainElement);
  }
}