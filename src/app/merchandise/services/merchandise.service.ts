import { Injectable } from '@angular/core';
import { Merchandise } from '../model/merchandise.entity';
import {BaseService} from "../../../shared/services/base.service";


@Injectable({
  providedIn: 'root'
})
export class MerchandiseService extends BaseService<Merchandise> {

  constructor() {
    super();
    this.resourceEndpoint = '/merchandise';
  }
}
