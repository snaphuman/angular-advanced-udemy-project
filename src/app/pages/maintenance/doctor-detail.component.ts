import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital-model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {

  doctorForm: FormGroup;
  hospitals: Hospital[] = [];

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      nombre: ['Person', Validators.required],
      hospital: ['', Validators.required]
    });

    this.showHospitals();
  }

  saveDoctor() {

    console.log(this.doctorForm.value);
  };

  showHospitals() {

    this.hospitalService.showHospitals()
        .subscribe( (res: Hospital[]) => {
          this.hospitals = res;
        })
  }


}
