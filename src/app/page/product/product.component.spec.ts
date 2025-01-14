// Import necessary modules for testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';

// Describe the test suite for the ProductComponent
describe('ProductComponent', () => {
  // Declare variables to hold the component and its fixture
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  // Set up the testing module asynchronously before each test
  beforeEach(async () => {
    // Configure the testing module, declaring imports or components necessary for the test
    await TestBed.configureTestingModule({
      imports: [ProductComponent]  // Declare ProductComponent as part of the imports (though, typically 'declarations' would be used for components)
    })
    .compileComponents();  // Compile the components to prepare them for testing

    // Create the component instance and the associated fixture
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;  // Get the instance of the ProductComponent
    fixture.detectChanges();  // Trigger change detection to update the component's view
  });

  // Define the test case for checking component creation
  it('should create', () => {
    expect(component).toBeTruthy();  // Ensure the component instance is successfully created
  });
});

