import { TestBed } from '@angular/core/testing';

import { OrderOnTripService } from './order-on-trip.service';

describe('OrderOnTripService', () => {
  let service: OrderOnTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderOnTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
