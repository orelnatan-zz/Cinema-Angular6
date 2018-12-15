import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { Modal } from '../../Core/Modal';

@Component({
  selector: 'dialog',
  templateUrl: './Dialog.modal.html',
  styleUrls: ['./Dialog.modal.scss']
})

export class Dialog {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onApprove: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalRef') modalRef: Modal;

  public openModal(){
    this.modalRef.openModal();
  }

  public closeModal(){
      this.modalRef.closeModal();
  }
}
