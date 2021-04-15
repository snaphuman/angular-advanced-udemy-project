import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GraphicOneComponent } from './pages/graphic-one/graphic-one.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProgressComponent } from './pages/progress/progress.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'graphic-one', component: GraphicOneComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
