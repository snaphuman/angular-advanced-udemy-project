import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm, RegisterFormBackend } from '../interfaces/register-form.interface';
import { ShowUsers } from '../interfaces/show-users.interface';
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

  get uid(): string {
    return this.user.uid || '';
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  };

  get headers(): any {
    return  {
            headers: {
              'x-token': this.token
            }
          };
  };

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role;
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
    localStorage.removeItem('menu');

    this.auth2 = gapi.auth2.getAuthInstance();
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }

  validateToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (res:any) => {

        const {
          email,
          google,
          nombre,
          role,
          img = '',
          uid } = res.usuario;

        this.user = new User (nombre, email, '', google, img, role, uid);

        this.setLocalStorage(res.token, res.menu);

        return true;
      }),
      catchError( error => of (false) )
    );
  }

  createUser( formData: RegisterForm ) {
    console.log('creating user');
    return this.http.post(`${ base_url }/usuarios`, this.fixDataToSend(formData))
                .pipe(
                  tap( (res: any) => {
                    this.setLocalStorage(res.token, res.menu);
                  })
                );
  }

  updateProfile( data: {email: string, nombre: string, role: string}) {

    data = {
      ...data,
      role: this.user.role,
    }

    return this.http.put(`${ base_url }/usuarios/${ this.user.uid }`, data, this.headers );
  }

  login( formData: LoginForm ) {

    return this.http.post(`${ base_url }/login`, formData)
                .pipe(
                  tap( (res: any) => {
                    this.setLocalStorage(res.token, res.menu);
                  })
                );
  }

  loginGoogle( token ) {
    console.log('token',token);

    return this.http.post(`${ base_url }/login/google`, {'token':token})
                .pipe(
                  tap( (res: any) => {
                    this.setLocalStorage(res.token, res.menu);
                  })
                );
  }

  saveUser( user: User ) {

    return this.http.put(`${ base_url }/usuarios/${ user.uid }`, user, this.headers );
  }


  deleteUser( user: User ) {

    const url = `${ base_url }/usuarios/${ user.uid }`;
    return this.http.delete( url, this.headers )
  }

  showUsers( from: number = 0 ) {

    const url = `${ base_url }/usuarios?desde=${ from }`;
    return this.http.get<ShowUsers>( url, this.headers )
           .pipe(
             map( (res: any) => {
              const users = res.usuarios.map(
                user => new User(
                  user.nombre,
                  user.email,
                  '',
                  user.google,
                  user.img,
                  user.role,
                  user.uid)
                );

              return {
                total: res.total,
                usuarios: users
              };
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

  setLocalStorage( token: string, menu: any ) {
    localStorage.setItem('token', token)
    localStorage.setItem('menu', JSON.stringify(menu))
  }
}
