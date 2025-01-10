// carts.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './carts.component';

describe('CartsComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add an item to the cart', () => {
    component.addItem('1', 'Product A', 2, 100);
    expect(component.items.length).toBe(1);
    expect(component.items[0].total).toBe(200);
  });

  it('should update the quantity of an existing item', () => {
    component.addItem('1', 'Product A', 2, 100);
    component.addItem('1', 'Product A', 3, 100);
    expect(component.items[0].quantity).toBe(5);
    expect(component.items[0].total).toBe(500);
  });

  it('should remove an item from the cart', () => {
    component.addItem('1', 'Product A', 2, 100);
    component.removeItem('1');
    expect(component.items.length).toBe(0);
  });

  it('should calculate the total sum of the cart', () => {
    component.addItem('1', 'Product A', 2, 100);
    component.addItem('2', 'Product B', 1, 200);
    expect(component.getTotal()).toBe(400);
  });
});
