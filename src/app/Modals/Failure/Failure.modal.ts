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

  public showFailure(notification: String): void{
      this.notification = notification;
      this.modalRef.openModal();
  }

  public hideFailure(): void{
      this.modalRef.closeModal();
  }
}
