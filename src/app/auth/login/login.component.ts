import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formSubmitted: boolean = false;

  loginForm = this.fb.group({
    email: ['foo@bar.com', [Validators.required, Validators.email]],
    password: ['123', Validators.required],
    remember: [false],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    ) { }

  login() {

    this.userService.login(this.loginForm.value)
    .subscribe( res => {
      console.log(res);
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    })
  }

}
