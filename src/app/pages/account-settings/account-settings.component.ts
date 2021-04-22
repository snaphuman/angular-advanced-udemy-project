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

  constructor() { }

  ngOnInit(): void {
  }

  changeTheme( theme: string ) {

    const element = document.querySelector('#theme');
    const url = `./assets/css/colors/${ theme }.css`;

    element.setAttribute('href', url);
  }
}
