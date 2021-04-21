import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicOneComponent } from './graphic-one/graphic-one.component';
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraphicOneComponent,
    PagesComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraphicOneComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ComponentsModule,
    RouterModule
  ]
})
export class PagesModule { }
