import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { Modal } from '../../Core/Modal';

@Component({
  selector: 'success',
  templateUrl: './Success.modal.html',
  styleUrls: ['./Success.modal.scss']
})

export class Success {
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalRef') modalRef: Modal;

  public openModal(){
      this.modalRef.openModal();
  }

  closeModal(){
      this.modalRef.closeModal();
  }

}
