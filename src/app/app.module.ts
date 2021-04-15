import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { GraphicOneComponent } from './pages/graphic-one/graphic-one.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    DashboardComponent,
    BreadcrumbComponent,
    SidebarComponent,
    HeaderComponent,
    ProgressComponent,
    GraphicOneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
