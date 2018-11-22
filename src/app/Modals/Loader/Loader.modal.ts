import { Component, Input, ViewChild } from '@angular/core';
import { Modal } from '../../Core/Modal';

@Component({
  selector: 'loader',
  templateUrl: './Loader.modal.html',
  styleUrls: ['./Loader.modal.scss']
})

export class Loader {

  @ViewChild('modalReference') modalReference: Modal;

  public showLoader(){
    this.modalReference.showModal();
  }

  public hideLoader(){
    this.modalReference.hideModal();
  }

}
