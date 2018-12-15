import { Component, Input, EventEmitter, ViewChild } from '@angular/core';
import { Modal } from '../../Core/Modal';

@Component({
  selector: 'failure',
  templateUrl: './Failure.modal.html',
  styleUrls: ['./Failure.modal.scss']
})

export class Failure {
  @Input() notification: String;

  @ViewChild('modalRef') modalRef: Modal;

  public openModal(notification: String){
      this.notification = notification;
      this.modalRef.openModal();
  }

  closeModal(){
      this.modalRef.closeModal();
  }
}
