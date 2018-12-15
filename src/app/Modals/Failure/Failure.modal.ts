import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { Modal } from '../../Core/Modal';

@Component({
  selector: 'failure',
  templateUrl: './Failure.modal.html',
  styleUrls: ['./Failure.modal.scss']
})

export class Failure {
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalRef') modalRef: Modal;

  public openModal(){
      this.modalRef.openModal();
  }

  closeModal(){
      this.modalRef.closeModal();
  }
}
