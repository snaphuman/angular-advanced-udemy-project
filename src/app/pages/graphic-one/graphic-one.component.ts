import { Component } from '@angular/core';
import { DoughnutData } from '../../models/doughnut-data.model';

@Component({
  selector: 'app-graphic-one',
  templateUrl: './graphic-one.component.html',
  styles: [
  ]
})

export class GraphicOneComponent {

  chart1: DoughnutData = {
    title: 'Sales',
    labels: ['download sales', 'in-store sales', 'mail-order sales'],
    chartData: [[350, 450, 100]] };

  chart2: DoughnutData = {
    title: 'Debts',
    labels: ['lorem ipsum', 'Dolor sit amet', 'Consecutur'],
    chartData: [[50, 650, 200]] };

  chart3: DoughnutData = {
    title: 'Profits',
    labels: ['download sales', 'in-store sales', 'mail-order sales'],
    chartData: [[550, 250, 50]] };

  chart4: DoughnutData = {
    title: 'Payments',
    labels: ['download sales', 'in-store sales', 'mail-order sales'],
    chartData: [[450, 50, 450]] };

}
