import { ComponentFixture, TestBed } from '@angular/core/testing';  // Import necessary testing utilities from Angular.
import { FooterComponent } from './footer.component';  // Import the FooterComponent that will be tested.

describe('FooterComponent', () => {  // Define a test suite for the FooterComponent.
  let component: FooterComponent;  // Declare a variable to hold the instance of the component.
  let fixture: ComponentFixture<FooterComponent>;  // Declare a variable to hold the test fixture, which creates and manages the component instance.

  beforeEach(async () => {  // Set up the test environment before each test case is executed.
    await TestBed.configureTestingModule({  // Configure the testing module for the FooterComponent.
      imports: [FooterComponent]  // Import the FooterComponent (note: it should be in 'declarations' for testing, not 'imports').
    })
    .compileComponents();  // Compile the component and its templates.

    fixture = TestBed.createComponent(FooterComponent);  // Create a test fixture for the FooterComponent.
    component = fixture.componentInstance;  // Get the component instance from the fixture.
    fixture.detectChanges();  // Trigger change detection, so the component and view are updated.
  });

  it('should create', () => {  // Define a test case that checks if the component was created successfully.
    expect(component).toBeTruthy();  // Assert that the component instance is truthy (i.e., it was created correctly).
  });
});
