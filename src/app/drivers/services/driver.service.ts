import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {DriverEntity} from "../model/driver.entity";

@Injectable({
  providedIn: 'root'
})
export class DriverService extends  BaseService<DriverEntity>{

  constructor() {
   super();
    this.resourceEndpoint = '/drivers';

  }
}
