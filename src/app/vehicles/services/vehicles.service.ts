import { Injectable } from '@angular/core';

import {VehiclesEntity} from "../model/vehicles.entity";
import {BaseService} from "../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class VehiclesService extends  BaseService<VehiclesEntity>{

  constructor() {
    super();
    this.resourceEndpoint = '/vehicles';

  }
}
