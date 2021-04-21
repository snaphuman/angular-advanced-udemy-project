import { Component, Input, OnInit } from '@angular/core';
import { Color } from 'ng2-charts'

import { DoughnutData } from 'src/app/models/doughnut-data.model';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent {

  @Input() dougnutData: DoughnutData;

  colors: Color[] = [
    {backgroundColor: ['#6857E6', '#009FEE', '#F02059']}
  ]
}
