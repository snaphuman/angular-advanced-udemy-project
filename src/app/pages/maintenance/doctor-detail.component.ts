import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital-model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {

  doctorForm: FormGroup;
  hospitals: Hospital[] = [];
  selectedHospital: Hospital;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private doctorService: DoctorService
              ) { }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.showHospitals();

    this.doctorForm.get('hospital').valueChanges.subscribe((id) => {
      console.log(id);
      this.selectedHospital = this.hospitals.find(hospital => {
          return hospital._id === id;
      });
      console.log(this.selectedHospital);
    })
  }

  saveDoctor() {

    this.doctorService.createDoctor(this.doctorForm.value)
        .subscribe( res => {
          console.log(res);
        })
  };

  showHospitals() {

    this.hospitalService.showHospitals()
        .subscribe( (res: Hospital[]) => {
          this.hospitals = res;
        })
  }


}
