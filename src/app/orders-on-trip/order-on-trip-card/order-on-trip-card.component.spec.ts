import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOnTripCardComponent } from './order-on-trip-card.component';

describe('OrderOnTripCardComponent', () => {
  let component: OrderOnTripCardComponent;
  let fixture: ComponentFixture<OrderOnTripCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderOnTripCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderOnTripCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
