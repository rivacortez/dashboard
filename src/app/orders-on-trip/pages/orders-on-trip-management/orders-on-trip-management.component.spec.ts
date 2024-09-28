import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOnTripManagementComponent } from './orders-on-trip-management.component';

describe('OrdersOnTripManagementComponent', () => {
  let component: OrdersOnTripManagementComponent;
  let fixture: ComponentFixture<OrdersOnTripManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersOnTripManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersOnTripManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
