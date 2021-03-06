import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicOneComponent } from './graphic-one/graphic-one.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorDetailComponent } from './maintenance/doctor-detail.component';
import { SearchComponent } from './search/search.component';

import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
      { path: '', component: DashboardComponent, data: { title: "Dashboard"} },
      { path: 'progress', component: ProgressComponent, data: { title: "Progress bar"} },
      { path: 'graphic-one', component: GraphicOneComponent, data: { title: "Graphic One"} },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: "Account settings"} },
      { path: 'promises', component: PromisesComponent, data: { title: "Promises"} },
      { path: 'rxjs', component: RxjsComponent, data: { title: "Rx JS"} },
      { path: 'profile', component: ProfileComponent, data: { title: "Profile"} },
      { path: 'search/:term', component: SearchComponent, data: { title: "Search"} },

      // Maintenance
      { path: 'doctors', component: DoctorsComponent, data: { title: "Application Doctors"} },
      { path: 'doctors/:id', component: DoctorDetailComponent, data: { title: "Doctor detail"} },
      { path: 'hospitals', component: HospitalsComponent, data: { title: "Application Hospitals"} },

      // Admin
      { path: 'users', canActivate: [ AdminGuard ], component: UsersComponent, data: { title: "Application users"} },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
