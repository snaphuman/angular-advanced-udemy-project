import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu = [];

  loadMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }
}
