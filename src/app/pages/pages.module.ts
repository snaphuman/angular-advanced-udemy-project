import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicOneComponent } from './graphic-one/graphic-one.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorDetailComponent } from './maintenance/doctor-detail.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraphicOneComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
    DoctorDetailComponent,
    SearchComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraphicOneComponent,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    PipesModule,
    RouterModule
  ]
})
export class PagesModule { }
