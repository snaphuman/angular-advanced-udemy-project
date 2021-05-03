import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formSubmitted: boolean = false;

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terms: [false, Validators.required]
  });

  constructor( private fb: FormBuilder ) { }

  createUser() {

    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      console.log('Posting form');
    } else {
      console.log('Not valid form');
    }
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
}
