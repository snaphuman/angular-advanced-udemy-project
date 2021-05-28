import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  hideModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.hideModal = true;
  }

}
