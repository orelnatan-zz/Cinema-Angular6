import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { Modal } from '../../Core/Modal';

@Component({
  selector: 'dialog',
  templateUrl: './Dialog.modal.html',
  styleUrls: ['./Dialog.modal.scss']
})

export class Dialog {
	@Output() onCancel: EventEmitter<any> = new EventEmitter();
	@Output() onApprove: EventEmitter<any> = new EventEmitter();
	@ViewChild('modalRef') modalRef: Modal;

	notification: string;
	
	public showDialog(notification: string): void {
		this.notification = notification;
		this.modalRef.openModal();
	}

	public hideDialog(): void {
		this.modalRef.closeModal();
	}

}
