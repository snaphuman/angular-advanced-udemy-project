import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private router: Router ) {
      this.user = userService.user;
    }

  ngOnInit(): void {
  }

  logout () {
    this.userService.logout();
  }

  search( value ) {

    if (value.length === 0) {
      this.router.navigateByUrl('/dashboard');
    }
    this.router.navigateByUrl(`/dashboard/search/${ value}`);
  }

}
