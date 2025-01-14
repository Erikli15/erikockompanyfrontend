import { ComponentFixture, TestBed } from '@angular/core/testing'; // Import necessary modules from Angular testing library
import { ContactComponent } from './contact.component'; // Import the component being tested

describe('ContactComponent', () => { // Define the test suite for ContactComponent
  let component: ContactComponent; // Declare the component variable
  let fixture: ComponentFixture<ContactComponent>; // Declare the fixture which provides access to the component's instance

  // This function is executed before each test case is run.
  beforeEach(async () => {
    // Configure the testing module for the ContactComponent
    await TestBed.configureTestingModule({
      imports: [ContactComponent] // Import the ContactComponent into the testing module
    })
    .compileComponents(); // Compile the components

    // Create the component instance and fixture
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection for the component
  });

  // A test case that checks if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy(); // Assert that the component is successfully created
  });
});

