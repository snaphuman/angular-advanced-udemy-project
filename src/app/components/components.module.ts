import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { IncrementComponent } from './increment/increment.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [IncrementComponent, DoughnutComponent, ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncrementComponent,
    DoughnutComponent,
    ModalComponent
  ]
})
export class ComponentsModule { }
