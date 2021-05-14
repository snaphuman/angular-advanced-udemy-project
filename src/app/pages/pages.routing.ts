import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicOneComponent } from './graphic-one/graphic-one.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: DashboardComponent, data: { title: "Dashboard"} },
      { path: 'progress', component: ProgressComponent, data: { title: "Progress bar"} },
      { path: 'graphic-one', component: GraphicOneComponent, data: { title: "Graphic One"} },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: "Account settings"} },
      { path: 'promises', component: PromisesComponent, data: { title: "Promises"} },
      { path: 'rxjs', component: RxjsComponent, data: { title: "Rx JS"} },
      { path: 'profile', component: ProfileComponent, data: { title: "Profile"} },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
