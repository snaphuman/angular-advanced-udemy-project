import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formSubmitted: boolean = false;

  registerForm = this.fb.group({
    name: ['Foo', Validators.required],
    email: ['foo@bar.com', [Validators.required, Validators.email]],
    password: ['123', Validators.required],
    password2: ['1234', Validators.required],
    terms: [true, Validators.required]
  }, {
    validators: this.passwordsMatch('password', 'password2')

  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router ) { }

  createUser() {

    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return
    }

    this.userService.createUser(this.registerForm.value)
        .subscribe( res => {
          this.router.navigateByUrl('/');
        }, (err) => {
          console.log(err.error.errors);
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  notValid( field: string ) {

    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  termsAccepted() {

    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  passwordsMatch(password: string, password2: string) {

    return ( formGroup: FormGroup ) => {

      const passControl = formGroup.get(password);
      const pass2Control = formGroup.get(password2);

      if (passControl.value === pass2Control.value) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ notEqual: true });
      }
    }
  }
}
