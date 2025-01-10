import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlarnaCheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: KlarnaCheckoutComponent;
  let fixture: ComponentFixture<KlarnaCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlarnaCheckoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlarnaCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
