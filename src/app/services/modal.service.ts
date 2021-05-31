import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _hideModal: boolean = true;
  type: string;
  id: string;
  img: string;

  get hideModal() {
    return this._hideModal;
  }

  constructor() { }

  openModal( type: 'hospitales' | 'medicos' | 'usuarios',
             id: string,
             img: string = 'no-image' ) {
    this._hideModal = false;
    this.type = type;
    this.id = id;
    this.img = img;

    if ( img.includes('google') ) {
      this.img = img;
    } else {

      this.img = `${ base_url }/upload/${ type }/${ img }`
    }
  }

  closeModal() {
    this._hideModal = true;
  }
}
