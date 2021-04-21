import { Component } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts'

@Component({
  selector: 'app-graphic-one',
  templateUrl: './graphic-one.component.html',
  styles: [
  ]
})
export class GraphicOneComponent {

  doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];

  colors: Color[] = [
    {backgroundColor: ['#6857E6', '#009FEE', '#F02059']}
  ]
}
