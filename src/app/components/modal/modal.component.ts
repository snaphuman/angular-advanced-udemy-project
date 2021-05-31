import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  selectedImage: File;
  imgPreview: string | ArrayBuffer = null;

  constructor( public modalService: ModalService ) { }

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


}
