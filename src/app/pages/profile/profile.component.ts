import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  public user: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {

    this.user = userService.user;
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      nombre: [this.user.nombre, Validators.required],
      email: [this.user.email, [Validators.email, Validators.required]]
    });
  }

  updateProfile() {
     console.log(this.profileForm.value);
     this.userService.updateProfile( this.profileForm.value )
         .subscribe( res => {
           const { nombre, email } = this.profileForm.value;
           this.user.nombre = nombre;
           this.user.email = email;
         })

  }
}
