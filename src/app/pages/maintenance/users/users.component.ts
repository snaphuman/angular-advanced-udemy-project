import { HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShowUsers } from 'src/app/interfaces/show-users.interface';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  totalUsers: number = 0;
  users: User[] = [];

  constructor( private userService: UserService ) { }

  ngOnInit(): void {
    this.userService.showUsers(0)
      .subscribe(({ total, usuarios }: any)  => {
        this.totalUsers = total;
        this.users = usuarios;
    })
  }

}
