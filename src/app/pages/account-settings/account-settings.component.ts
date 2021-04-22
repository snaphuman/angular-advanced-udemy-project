import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
    `.selector {
      cursor: pointer;
    }`
  ]
})
export class AccountSettingsComponent implements OnInit {

  element = document.querySelector('#theme');

  constructor() { }

  ngOnInit(): void {
  }

  changeTheme( theme: string ) {

    const url = `./assets/css/colors/${ theme }.css`;

    this.element.setAttribute('href', url);
    localStorage.setItem('theme', url);
  }
}
