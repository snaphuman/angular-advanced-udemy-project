import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital-model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient)
  { }

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

  showHospitals() {

    const url = `${ base_url }/hospitales`;
    return this.http.get<Hospital[]>( url, this.headers )
               .pipe(
                 map( (res: any) => res.hospitales )
               )
  }
}
