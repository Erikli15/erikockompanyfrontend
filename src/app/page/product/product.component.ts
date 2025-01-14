// Import required Angular modules
import { CommonModule } from '@angular/common'; // For common Angular directives like ngIf, ngFor
import { Component, OnInit } from '@angular/core'; // To create a component and implement lifecycle hooks
import { ActivatedRoute } from '@angular/router'; // To access the current route's parameters
import axios from 'axios'; // For making HTTP requests

// Define an interface to type-check the product object
interface Product {
  id: number; // Product ID
  productName: string; // Name of the product
  price: number; // Price of the product
  category: string; // Category to which the product belongs
  descriptions: string; // Description of the product
  stockLevel: number; // Available stock for the product
  imgUrl: string; // URL for the product image
}

@Component({
  selector: 'app-product', // This is the custom HTML tag used for this component
  imports: [CommonModule], // CommonModule is imported to make common Angular directives available
  templateUrl: './product.component.html', // Path to the component's HTML template
  styleUrl: './product.component.scss' // Path to the component's CSS styles
})
export class ProductComponent implements OnInit {
  product: Product | undefined; // Variable to hold the fetched product data

  // Constructor with dependency injection for ActivatedRoute to access route parameters
  constructor(private route: ActivatedRoute) {}

  // OnInit lifecycle hook to run code when the component initializes
  ngOnInit(): void {
    // Get the 'id' parameter from the current route (e.g., /product/:id)
    const productId = this.route.snapshot.paramMap.get('id');
    
    // If the product ID exists, fetch the product details
    if (productId) {
      this.fetchProduct(parseInt(productId, 10)); // Convert the productId to a number and fetch product data
    }
  }

  // Method to fetch product details from the server using Axios
  fetchProduct(productId: number) {
    console.log('Fetching product with ID:', productId); // Debug log

    // Send a GET request to the server to fetch product data based on productId
    axios
      .get(`http://localhost:3000/products/${productId}`) // Assuming the API is running locally
      .then((response) => {
        console.log('API Response:', response.data); // Debug log showing the API response
        this.product = response.data[0]; // Assuming the response is an array, we extract the first product
      })
      .catch((error) => {
        console.error('Error fetching product:', error); // Log any errors in case of failure
      });
  }

  // Method triggered when the "Buy" button is clicked
  onBuyClick(productId: number | undefined) {
    console.log(`Bought product with ID: ${productId}`); // Debug log to confirm the clicked product
    // Here you can add logic to handle the purchasing process, e.g., updating stock, processing payment, etc.
  }
}
