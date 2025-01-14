import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importing necessary Angular testing utilities

import { WebbshopComponent } from './webbshop.component'; // Importing the component to be tested

describe('WebbshopComponent', () => { // Describe block for grouping related tests for WebbshopComponent
  let component: WebbshopComponent; // Declaring the component instance variable
  let fixture: ComponentFixture<WebbshopComponent>; // Declaring the fixture instance variable, which helps to interact with the component

  beforeEach(async () => { // Before each test, this block will execute
    await TestBed.configureTestingModule({ // Configures the testing module for the component
      imports: [WebbshopComponent] // Declaring the component to be tested
    })
    .compileComponents(); // Compiles the components for the test

    fixture = TestBed.createComponent(WebbshopComponent); // Creates the component fixture, which is an environment for the component
    component = fixture.componentInstance; // Gets the instance of the component for testing
    fixture.detectChanges(); // Triggers change detection for the component
  });

  it('should create', () => { // Test case to verify the creation of the component
    expect(component).toBeTruthy(); // Assert that the component instance is truthy (i.e., the component is created successfully)
  });
});

