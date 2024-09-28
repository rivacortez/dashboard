import {Component, OnInit} from '@angular/core';
import {StatisticsResponse, StatisticsService} from "../../services/stadistics.service";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

import {StatisticsEntity} from "../../model/statistics.entity";
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})



export class StatisticsComponent implements OnInit {

  chart: any;

  constructor(private statisticsService: StatisticsService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.statisticsService.getStatisticsData().subscribe((response: StatisticsResponse[]) => {
      if (response && response.length > 0) {
        const statistics = new StatisticsEntity(response[0].data);
        this.loadChart(statistics.data);
      }
    });

  }
  loadChart(chartData: any): void {
    if (chartData.chart1 && chartData.chart1.labels && chartData.chart1.orders) {
      this.createChart(
        'load-chart-1',
        'Número de pedidos por mes',
        chartData.chart1.labels,
        chartData.chart1.orders,
        'rgba(75, 192, 192, 0.2)',
        'rgb(75, 192, 192)'
      );
    }

    if (chartData.chart2 && chartData.chart2.labels && chartData.chart2.deliveries) {
      this.createChart(
        'load-chart-2',
        'Número de entregas por región',
        chartData.chart2.labels,
        chartData.chart2.deliveries,
        'rgba(255, 159, 64, 0.2)',
        'rgb(255, 159, 64)'
      );
    }

    if (chartData.chart3 && chartData.chart3.labels && chartData.chart3.cargo) {
      this.createChart(
        'load-chart-3',
        'Tipos de carga transportada',
        chartData.chart3.labels,
        chartData.chart3.cargo,
        'rgba(255, 205, 86, 0.2)',
        'rgb(255, 205, 86)'
      );
    }
  }

  createChart(
    elementId: string,
    label: string,
    labels: string[],
    data: number[],
    backgroundColor: string,
    borderColor: string
  ): void {
    new Chart(elementId, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
