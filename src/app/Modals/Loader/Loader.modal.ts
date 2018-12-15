import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Modal } from '../../Core/Modal';

@Component({
  selector: 'loader',
  templateUrl: './Loader.modal.html',
  styleUrls: ['./Loader.modal.scss']
})

export class Loader {
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalRef') modalRef: Modal;

  public openModal(){
    this.modalRef.openModal();
  }

  public closeModal(){
      this.modalRef.closeModal();
  }
}
