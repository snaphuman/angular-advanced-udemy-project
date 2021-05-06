import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm, RegisterFormBackend } from '../interfaces/register-form.interface';
import { User } from '../models/user.model';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth2: any;
  user: User;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) {

    this.googleInit();
  }

  googleInit() {

    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '990401532765-35m766eonki518tvat8pc070ke6p99lt.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    })
  };

  logout () {

    localStorage.removeItem('token');
    this.auth2 = gapi.auth2.getAuthInstance();
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }

  validateToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (res:any) => {

        const {
          email,
          google,
          nombre,
          role,
          img,
          uid } = res.user;

        this.user = new User (nombre, email, '', google, img, role, uid);

        localStorage.setItem('token', res.token);
      }),
      map( (res:any) => true ),
      catchError( error => of (false) )
    );
  }

  createUser( formData: RegisterForm ) {
    console.log('creating user');
    return this.http.post(`${ base_url }/usuarios`, this.fixDataToSend(formData))
                .pipe(
                  tap( (res: any) => {
                    console.log(res.token)
                    localStorage.setItem('token', res.token)
                  })
                );
  }

  login( formData: LoginForm ) {

    return this.http.post(`${ base_url }/login`, formData)
                .pipe(
                  tap( (res: any) => {
                    console.log(res.token)
                    localStorage.setItem('token', res.token)
                  })
                );
  }

  loginGoogle( token ) {
    console.log('token',token);

    return this.http.post(`${ base_url }/login/google`, {'token':token})
                .pipe(
                  tap( (res: any) => {
                    localStorage.setItem('token', res.token)
                  })
                );
  }

  private fixDataToSend( formData: RegisterForm ) : RegisterFormBackend {

     const form: RegisterFormBackend = {
     nombre: formData.name,
     email: formData.email,
     password: formData.password,
     password2: formData.password2,
     terminos: formData.terms,
     };

     return form;
  }

}
