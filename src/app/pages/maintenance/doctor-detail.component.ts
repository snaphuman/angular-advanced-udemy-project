import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital-model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {

  doctorForm: FormGroup;
  hospitals: Hospital[] = [];
  selectedHospital: Hospital;
  selectedDoctor: Doctor;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private doctorService: DoctorService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id } ) => {
      console.log(id);
      this.getDoctor( id );
    });

    this.doctorForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.showHospitals();

    this.doctorForm.get('hospital').valueChanges.subscribe((id) => {
      console.log(id);
      this.selectedHospital = this.hospitals.find((hospital) => {
          return hospital._id === id;
      });
    })
  }

  getDoctor (id: string) {

    if (id === 'new') return;

    this.doctorService.getDoctor(id)
        .pipe(
          delay(100)
        )
        .subscribe((res) => {

          if (!res) {
            return this.router.navigateByUrl(`/dashboard/doctors`);
          }

          const { nombre, hospital: { _id }} = res;
          this.selectedDoctor = res;
          this.doctorForm.setValue({ nombre, hospital: _id })
        })
  }


  saveDoctor() {

    const { nombre } = this.doctorForm.value;

    if (this.selectedDoctor) {
      const data = {
        ...this.doctorForm.value,
        _id: this.selectedDoctor._id
      }
      this.doctorService.updateDoctor( data )
          .subscribe((res) => {
            Swal.fire('Updated',  `Doctor ${nombre} updated succesfuly`, 'success');
          })
    } else {
      this.doctorService.createDoctor(this.doctorForm.value)
          .subscribe( (res:any) => {
            Swal.fire('Saved',  `Doctor ${nombre} created succesfuly`, 'success');
            this.router.navigateByUrl(`/dashboard/doctor/${ res.medico._id}`);
          });
    }
  }

  showHospitals() {

    this.hospitalService.showHospitals()
        .subscribe( (res: Hospital[]) => {
          this.hospitals = res;
        })
  }


}
