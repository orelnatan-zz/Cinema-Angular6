import { Component, ViewChild } from '@angular/core';
import { Modal } from '../../Core/Modal';

@Component({
  selector: 'dialog',
  templateUrl: './Dialog.modal.html',
  styleUrls: ['./Dialog.modal.scss']
})

export class Dialog {

  @ViewChild('modalReference') modalReference: Modal;

  public showDialog(){
    this.modalReference.showModal();
  }

  public hideDialog(){
    this.modalReference.hideModal();
  }
}
