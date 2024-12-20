import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebbshopComponent } from './webbshop.component';

describe('WebbshopComponent', () => {
  let component: WebbshopComponent;
  let fixture: ComponentFixture<WebbshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebbshopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebbshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
