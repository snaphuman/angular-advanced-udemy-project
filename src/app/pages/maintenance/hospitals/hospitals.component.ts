import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital-model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalService } from 'src/app/services/modal.service';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  loading: boolean = true;
  imgPreview: any = null;

  constructor( private hospitalService: HospitalService,
               private modalService: ModalService,
               private searchService: SearchService ) { }

  ngOnInit(): void {
    this.showHospitals();
    this.imgPreview = this.modalService.refreshImage
                          .pipe(
                            delay(1000))
                          .subscribe( img => this.showHospitals())
  }

  showHospitals() {
    this.loading = true;
    this.hospitalService.showHospitals()
        .subscribe( res => {
          console.log(res);
          this.loading = false
          this.hospitals = res;
        })
  }

  updateHospital( hospital: Hospital ) {

    this.hospitalService.updateHospital( hospital._id, hospital.nombre )
        .subscribe( res => {
          Swal.fire('Updated', hospital.nombre, 'success');
        })
  }

  deleteHospital( hospital: Hospital ) {

    this.hospitalService.deleteHospital( hospital._id )
        .subscribe( res => {
          Swal.fire('Deleted', hospital.nombre, 'success');
        })
  }

  createHospital( hospital: Hospital ) {

    this.hospitalService.createHospital( hospital.nombre )
        .subscribe( res => {
          Swal.fire('Created', hospital.nombre, 'success');
        })
  }

  async newDialog() {

    const { value } = await Swal.fire({
      title: 'Create Hospital',
      text: 'Enter new Hospital name',
      input: 'text',
      inputLabel: 'Hospital name',
      inputPlaceholder: 'Enter the Hospital name',
      showCancelButton: true

    })

    if (value) {
      this.hospitalService.createHospital( value )
          .subscribe( (res: any) => {
            Swal.fire('Success', `${value} successfully created`, 'success');
            this.hospitals.push(res.hospital);
          })
    }
  }

  openModal( hospital: Hospital ) {
    this.modalService.openModal('hospitales', hospital._id, hospital.img )
  }

  search( term: string ) {
    if (!term) return;

    this.searchService.search('hospitales', term)
        .subscribe(res => {
          console.log(res);

          this.hospitals = res
        })
  }
}
