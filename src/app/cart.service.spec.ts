// Importing the necessary modules from Angular for testing
import { TestBed } from '@angular/core/testing';

// Importing the CartService that is to be tested
import { CartService } from './cart.service';

// Describing the test suite for the CartService
describe('CartService', () => {
  // Declaring a variable to hold the instance of the service
  let service: CartService;

  // The beforeEach block runs before each test in the suite
  beforeEach(() => {
    // Configures the testing module. No special configurations are needed here.
    TestBed.configureTestingModule({});
    // Injecting the CartService instance into the service variable
    service = TestBed.inject(CartService);
  });

  // A simple test case that checks if the CartService instance is created successfully
  it('should be created', () => {
    // Expecting the service to be truthy (i.e., it should be defined and not null)
    expect(service).toBeTruthy();
  });
});
