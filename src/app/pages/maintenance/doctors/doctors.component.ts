import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalService } from 'src/app/services/modal.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit, OnDestroy {

  doctors: Doctor[] = [];
  loading: boolean = false;
  imgPreview: any = null;

  constructor(private doctorService: DoctorService,
              private modalService: ModalService,
              private searchService: SearchService) { }
  ngOnInit(): void {
    this.showDoctors();
    this.imgPreview = this.modalService.refreshImage
                          .pipe(
                            delay(1000))
                          .subscribe( img => this.showDoctors())
  }

  ngOnDestroy(): void {

    this.imgPreview.unsubscribe();
  }

  showDoctors() {

    this.loading = true;

    this.doctorService.showDoctors()
        .subscribe( res => {
          console.log(res);
          this.doctors = res
          this.loading = false;
        })
  }

  openModal( doctor: Doctor ) {
    this.modalService.openModal('medicos', doctor._id, doctor.img )
  }

  search( term: string ) {
    if (!term) return;

    this.searchService.search('medicos', term)
        .subscribe((res: Doctor[]) => {

          this.doctors = res
        })
  }

}
