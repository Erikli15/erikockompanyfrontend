import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

// Define the Product interface
interface Product {
  id: number;
  productName: string;
  price: number;
  category: string;
  descriptions: string;
  stockLevel: number;
  imgUrl: string;
}

@Component({
  selector: 'app-product',
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  product: Product | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.fetchProduct(parseInt(productId, 10));
    }
  }

  fetchProduct(productId: number) {
    console.log('Fetching product with ID:', productId); // Debug
    axios
      .get(`http://localhost:3000/products/${productId}`)
      .then((response) => {
        console.log('API Response:', response.data); // Debug
        this.product = response.data[0]; // Extract the first element from the array
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }

  onBuyClick(productId: number | undefined) {
    console.log(`Köpt produkt med ID: ${productId}`);
    // Här kan du lägga till logik för att hantera köp
  }
}
