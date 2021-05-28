import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor( private http: HttpClient ) { }

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

  search( type: 'usuarios' | 'medicos' | 'hostpitales',
          term: string ) {

    const url = `${ base_url }/todo/coleccion/${ type }/${ term }`;
    return this.http.get<any[]>( url, this.headers )
           .pipe(
             map( (res: any) => {

              switch (type) {
                case 'usuarios':
                  return this.transformUsers(res.resultados);
                case 'medicos':
                  return [];
                case 'hostpitales':
                  return [];
                  break;
                default:
                  return [];
              }
             })
           )
  }

  private transformUsers( results: any[] ): User[] {

    return results.map(
              user => new User(
                user.nombre,
                user.email,
                '',
                user.google,
                user.img,
                user.role,
                user.uid)
              );
  }
}
