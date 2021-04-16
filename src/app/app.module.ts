import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    AuthModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
