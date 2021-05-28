import { HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShowUsers } from 'src/app/interfaces/show-users.interface';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';
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
  from: number = 0;
  loading: boolean = true;

  constructor( private userService: UserService,
               private searchService: SearchService ) { }

  ngOnInit(): void {
    this.showUsers();

  }

  showUsers() {
    this.loading = true;
    this.userService.showUsers( this.from )
      .subscribe(({ total, usuarios }: any)  => {
        this.totalUsers = total;
        this.users = usuarios;
        this.loading = false;
    })
  }

  changePage( value: number ) {
    this.from += value

    if ( this.from < 0 ) this.from = 0;

    if ( this.from >= this.totalUsers ) this.from -= value;

    this.showUsers();
  }

  search( term: string ) {
    if (!term) return;

    this.searchService.search('usuarios', term)
        .subscribe(res => {
          console.log(res);

          this.users = res
        })
  }

}
