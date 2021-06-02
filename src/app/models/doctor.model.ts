import { Hospital } from "./hospital-model";

interface _DoctorUser {
  _id: string;
  nombre: string;
}

export class Doctor {

  constructor  (
    public _id?: string,
    public nombre?: string,
    public usuario?: _DoctorUser,
    public hospital?: Hospital
    ){}
}
