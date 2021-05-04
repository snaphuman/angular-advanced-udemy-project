import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm, RegisterFormBackend } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

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
