// Importing necessary modules from Angular testing utilities and the AboutComponent
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

// Describe block for the AboutComponent test suite
describe('AboutComponent', () => {
  let component: AboutComponent;  // Declaring a variable to hold the instance of AboutComponent
  let fixture: ComponentFixture<AboutComponent>;  // Declaring a fixture for the AboutComponent

  // Before each test case, set up the testing environment
  beforeEach(async () => {
    // Configure the testing module to declare the AboutComponent
    await TestBed.configureTestingModule({
      imports: [AboutComponent]  // Importing the AboutComponent module for testing
    })
    .compileComponents();  // Compiling the components to be ready for testing

    // Create an instance of the AboutComponent and assign it to the fixture
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;  // Assigning the component instance
    fixture.detectChanges();  // Triggering change detection to update the component
  });

  // A simple test case to check if the component was created successfully
  it('should create', () => {
    // Expect the component instance to be truthy, meaning it was created successfully
    expect(component).toBeTruthy();
  });
});
