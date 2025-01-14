import { ComponentFixture, TestBed } from '@angular/core/testing';  // Importing necessary testing modules from Angular
import { HeaderComponent } from './header.component';  // Importing the component to be tested

// Describing the test suite for the HeaderComponent
describe('HeaderComponent', () => {
  let component: HeaderComponent;  // Declaring a variable to hold the component instance
  let fixture: ComponentFixture<HeaderComponent>;  // Declaring a variable to hold the component's fixture

  // beforeEach is a setup function that runs before each individual test
  beforeEach(async () => {
    // Configuring the testing module for the HeaderComponent
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]  // Importing the HeaderComponent to be tested
    })
    .compileComponents();  // Compiling the components to prepare for the test

    fixture = TestBed.createComponent(HeaderComponent);  // Creating the component fixture
    component = fixture.componentInstance;  // Getting the instance of the component from the fixture
    fixture.detectChanges();  // Triggering change detection to update the component's state
  });

  // A simple test case to check if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();  // Verifying that the component instance is truthy (i.e., it exists)
  });
});

