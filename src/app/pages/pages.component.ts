import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  theme: string = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';

  constructor() { }

  ngOnInit(): void {

    this.setTheme();
  }

  setTheme ( ) {

    const element = document.querySelector('#theme');
    element.setAttribute('href', this.theme);
  }
}
