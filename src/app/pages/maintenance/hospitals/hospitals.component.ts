import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  constructor( private hospitalService: HospitalService ) { }

  ngOnInit(): void {
  }

  showHospitals() {
    this.hospitalService.showHospitals().subscribe( res => {

      console.log(res);
    })
  }

}
