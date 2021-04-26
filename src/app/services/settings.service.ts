import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private theme = document.querySelector('#theme');

  constructor() {

    this.setTheme();
  }

  setTheme ( ) {

    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.theme.setAttribute('href', url);
  }

  changeTheme( theme: string ) {

    const url = `./assets/css/colors/${ theme }.css`;

    this.theme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkWorkingTheme();
  }

  checkWorkingTheme () {

    const links = document.querySelectorAll('.selector');

    links.forEach( element => {

      element.classList.remove('working');

      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.theme.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    })

  }

}
