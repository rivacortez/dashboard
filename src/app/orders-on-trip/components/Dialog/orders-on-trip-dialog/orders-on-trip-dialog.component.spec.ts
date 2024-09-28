import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOnTripDialogComponent } from './orders-on-trip-dialog.component';

describe('OrdersOnTripDialogComponent', () => {
  let component: OrdersOnTripDialogComponent;
  let fixture: ComponentFixture<OrdersOnTripDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersOnTripDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersOnTripDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
