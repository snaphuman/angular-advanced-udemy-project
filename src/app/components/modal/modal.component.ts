import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  selectedImage: File;
  imgPreview: string | ArrayBuffer = null;

  constructor( public modalService: ModalService,
               private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.imgPreview = null;
    this.modalService.closeModal();
  }

  selectImage( file: File ) {
    this.selectedImage = file;

    if (!file) {
      return this.imgPreview = null
    };

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgPreview = reader.result;
    }
  }

  uploadImage() {

    const id = this.modalService.id;
    const type = this.modalService.type;

    this.fileUploadService.updatePicture(
      this.selectedImage,
      type,
      id
    ).then( img => {
      Swal.fire('Success', 'File was uploaded succesfully', 'success')

      this.modalService.refreshImage.emit(img);

      this.closeModal();
    }).catch( err => {
      console.log(err);
      Swal.fire('Error', 'File cannot be uploaded', 'error')
    });

  }

}
