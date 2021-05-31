import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { ModalService } from 'src/app/services/modal.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  totalUsers: number = 0;
  users: User[] = [];
  from: number = 0;
  loading: boolean = true;
  modalSubscription: Subscription;

  constructor( private userService: UserService,
               private searchService: SearchService,
               private modalService: ModalService )
               { }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.showUsers();
    this.modalSubscription = this.modalService.refreshImage
        .pipe(
          delay(100)
        )
        .subscribe( data => this.showUsers() )
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

  deleteUser( user: User ) {

    if (user.uid === this.userService.uid) {

      return Swal.fire('Error', 'Logged in user cannot be deleted', 'error');
    }

    Swal.fire({
      title: '¿Delete User?',
      text: `You are going to delete ${ user.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(user)
            .subscribe( res => {
              Swal
              .fire(
                'User deleted',
                `${user.nombre} was deleted`,
                'success');
              this.showUsers();
          })
      }
    })
  }

  updateRole( user: User ) {
    this.userService.saveUser(user).subscribe( res => {

      console.log(res)
    })

  }

  openModal( user: User )  {
    this.modalService.openModal('usuarios', user.uid, user.img);
  }

}
