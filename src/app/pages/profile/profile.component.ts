import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      nombre: ['123', Validators.required],
      email: ['abc', [Validators.email, Validators.required]]
    });
  }

  updateProfile() {
     console.log(this.profileForm.value);
     this.userService.updateProfile( this.profileForm.value )
         .subscribe( res => {
           console.log(res);
         })

  }
}
