import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'Progress bar', url: 'progress' },
        { title: 'Graphic one', url: 'graphic-one' },
        { title: 'Promises', url: 'promises' },
        { title: 'RxJS', url: 'rxjs' },
      ]
    },


  ];

  constructor() { }
}
