import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _hideModal: boolean = true;

  get hideModal() {
    return this._hideModal;
  }

  constructor() { }

  openModal() {
    this._hideModal = false;
  }

  closeModal() {
    this._hideModal = true;
  }
}
