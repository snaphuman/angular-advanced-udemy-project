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

  link: Element = document.querySelector('#theme');
  links: NodeListOf<Element>;

  constructor() { }

  ngOnInit(): void {

    this.link = document.querySelector('#theme');
    this.links = document.querySelectorAll('.selector');
    this.checkWorkingTheme();
  }

  changeTheme( theme: string ) {

    const url = `./assets/css/colors/${ theme }.css`;

    this.link.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkWorkingTheme();
  }

  checkWorkingTheme () {

    let links = this.links;

    links.forEach( element => {

      element.classList.remove('working');

      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.link.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    })

  }
}
