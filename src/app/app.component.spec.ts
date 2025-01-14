import { TestBed } from '@angular/core/testing';  // Importing the TestBed module to configure the testing environment
import { AppComponent } from './app.component';   // Importing the AppComponent that will be tested

describe('AppComponent', () => {  // Describing a test suite for the AppComponent
  beforeEach(async () => {  // Running the setup code before each test
    await TestBed.configureTestingModule({  // Configuring the TestBed to include the AppComponent
      imports: [AppComponent],  // Declaring the AppComponent in the testing module
    }).compileComponents();  // Compiling the component's templates and styles
  });

  it('should create the app', () => {  // Test case to verify the app is created
    const fixture = TestBed.createComponent(AppComponent);  // Creating a fixture for the AppComponent
    const app = fixture.componentInstance;  // Accessing the component instance
    expect(app).toBeTruthy();  // Asserting that the component instance is truthy (i.e., successfully created)
  });

  it(`should have the 'erikocompanyfrontend' title`, () => {  // Test case to verify the title property of the app
    const fixture = TestBed.createComponent(AppComponent);  // Creating a fixture for the AppComponent
    const app = fixture.componentInstance;  // Accessing the component instance
    expect(app.title).toEqual('erikocompanyfrontend');  // Asserting that the title property is equal to 'erikocompanyfrontend'
  });

  it('should render title', () => {  // Test case to verify the title is rendered in the HTML
    const fixture = TestBed.createComponent(AppComponent);  // Creating a fixture for the AppComponent
    fixture.detectChanges();  // Triggering change detection to update the view
    const compiled = fixture.nativeElement as HTMLElement;  // Accessing the compiled HTML element
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, erikocompanyfrontend');  // Asserting that the <h1> element contains the correct text
  });
});

