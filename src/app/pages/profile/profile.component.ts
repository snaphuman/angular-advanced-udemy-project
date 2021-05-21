import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';

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
         })
  }

  selectImage( file: File ) {
    console.log(file)
    this.selectedImage = file;
  }

  uploadImage() {
    this.fileUploadService.updatePicture(
      this.selectedImage,
      'usuarios',
      this.user.uid
    ).then( img => console.log(img));

  }
}
