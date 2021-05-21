import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  user: User;
  selectedImage: File;
  imgPreview: string | ArrayBuffer = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {

    this.user = userService.user;
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      nombre: [this.user.nombre, Validators.required],
      email: [this.user.email, [Validators.email, Validators.required]]
    });
  }

  updateProfile() {
     console.log(this.profileForm.value);
     this.userService.updateProfile( this.profileForm.value )
         .subscribe( res => {
           const { nombre, email } = this.profileForm.value;
           this.user.nombre = nombre;
           this.user.email = email;

           Swal.fire('Saved', 'User was updated', 'success');
         }, (err) => {
           Swal.fire('Cannot be saved', err.error.msg, 'error');
         })
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
    this.fileUploadService.updatePicture(
      this.selectedImage,
      'usuarios',
      this.user.uid
    ).then( img => {
      this.user.img = img
      Swal.fire('Success', 'File was uploaded succesfully', 'success')
    }).catch( err => {
      console.log(err);
      Swal.fire('Error', 'File cannot be uploaded', 'error')
    });

  }
}
