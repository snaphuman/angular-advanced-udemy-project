import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[] = [];
  loading: boolean = false;

  constructor(private doctorService: DoctorService,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.showDoctors;
  }

  showDoctors() {

    this.loading = true;

    this.doctorService.showDoctors()
        .subscribe( res => {
          console.log(res);
          this.loading = false;
        })
  }

  openModal( doctor: Doctor ) {
    this.modalService.openModal('medicos', doctor._id, doctor.img )
  }

}
