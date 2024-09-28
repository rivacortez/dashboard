import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {StatisticsEntity} from "../model/statistics.entity";
import {catchError, Observable, retry} from "rxjs";


export interface Chart1 {
  labels: string[];
  orders: number[];
}

export interface Chart2 {
  labels: string[];
  deliveries: number[];
}

export interface Chart3 {
  labels: string[];
  cargo: number[];
}

export interface Data {
  chart1: Chart1;
  chart2: Chart2;
  chart3: Chart3;
}


export interface StatisticsResponse {
  data: Data;
}


@Injectable({
  providedIn: 'root',
})
export class StatisticsService extends BaseService<StatisticsEntity> {
  constructor() {
    super();
    this.resourceEndpoint = '/data_statistics';
  }


  public getStatisticsData(): Observable<StatisticsResponse[]> {
    return this.http.get<StatisticsResponse[]>(this.resourcePath(), this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}

