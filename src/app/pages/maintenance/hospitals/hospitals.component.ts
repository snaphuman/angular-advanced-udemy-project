import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital-model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  loading: boolean = true;

  constructor( private hospitalService: HospitalService ) { }

  ngOnInit(): void {
  }

  showHospitals() {
    this.loading = true;
    this.hospitalService.showHospitals()
        .subscribe( res => {
          this.loading = false
          this.hospitals = res;
        })
  }

}
