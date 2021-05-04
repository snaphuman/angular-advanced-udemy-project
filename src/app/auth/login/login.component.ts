import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formSubmitted: boolean = false;
  auth2: any;

  loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '',
           [Validators.required, Validators.email]],
    password: ['123', Validators.required],
    remember: [false],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone,
    ) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {

    this.userService.login(this.loginForm.value)
    .subscribe( res => {
      if ( this.loginForm.get('remember').value ) {
        localStorage.setItem('email', this.loginForm.get('email').value);
      } else {
        localStorage.removeItem('email');
      }

      this.router.navigateByUrl('/');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    })
  }

  onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }

  onFailure(error) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '990401532765-35m766eonki518tvat8pc070ke6p99lt.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin(element) {

    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.userService.loginGoogle(id_token).subscribe( (res) => {

            this.ngZone.run(() => {
              this.router.navigateByUrl('/');
            });
          });

        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }


}
