import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

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

  showDoctors() {

    const url = `${ base_url }/medicos`;
    return this.http.get<Doctor[]>( url, this.headers )
               .pipe(
                 map( (res: any) => res.medicos )
               )
  }

  createDoctor(doctor: Doctor) {

    const url = `${ base_url }/medicos`;
    return this.http.post( url, doctor, this.headers)

  }

  updateDoctor(doctor: Doctor) {

    const url = `${ base_url }/medicos/${ doctor._id }`;
    return this.http.put( url, doctor , this.headers)
  }

  deleteDoctor(id: string) {

    const url = `${ base_url }/medicos/${ id }`;
    return this.http.delete( url, this.headers)
  }

}
