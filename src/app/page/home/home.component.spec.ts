import { ComponentFixture, TestBed } from '@angular/core/testing';

// Import the HomeComponent which will be tested
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  // Declare variables to hold references to the component and fixture
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  // beforeEach is used to set up the testing environment before each test case
  beforeEach(async () => {
    // Configure the testing module by importing HomeComponent into the testing context
    await TestBed.configureTestingModule({
      imports: [HomeComponent] // HomeComponent is added to the imports array, which is incorrect here as HomeComponent should be declared, not imported
    })
    .compileComponents();  // Compile the components for the test

    // Create a fixture for the HomeComponent and obtain an instance of the component
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    
    // Trigger change detection to initialize the component and its view
    fixture.detectChanges();
  });

  // Define the actual test case
  it('should create', () => {
    // Verify that the component was successfully created
    expect(component).toBeTruthy();
  });
});

