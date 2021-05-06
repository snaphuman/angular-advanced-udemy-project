import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  imgUrl: string = ''

  constructor(
    private userService: UserService,
    private router: Router ) {
      this.imgUrl = userService.user.imageUrl;
    }

  ngOnInit(): void {
  }

  logout () {
    this.userService.logout();
  }

}
