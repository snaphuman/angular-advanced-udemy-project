import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from '../auth/register/register.component';
import { RegisterForm, RegisterFormBackend } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

  createUser( formData: RegisterForm ) {
    console.log('creating user');
    return this.http.post(`${ base_url }/usuarios`, this.fixDataToSend(formData));
  }

  fixDataToSend( formData: RegisterForm ) : RegisterFormBackend {

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
