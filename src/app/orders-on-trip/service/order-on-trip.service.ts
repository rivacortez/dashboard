import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {OrderOnTripEntity} from "../model/order-on-trip.entity";


@Injectable({
  providedIn: 'root'
})
export class OrderOnTripService extends  BaseService<OrderOnTripEntity> {

  constructor() {
    super();
    this.resourceEndpoint = '/ordersOnTrip';
  }

}
