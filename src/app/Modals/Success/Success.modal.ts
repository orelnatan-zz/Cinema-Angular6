import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { Modal } from '../../Core/Modal';

@Component({
  selector: 'success',
  templateUrl: './Success.modal.html',
  styleUrls: ['./Success.modal.scss']
})

export class Success {
  @ViewChild('modalRef') modalRef: Modal;

	notification: string;

	public showSuccess(notification: string): void {
		this.notification = notification;
		this.modalRef.openModal();
	}

	public hideSuccess(): void {
		this.modalRef.closeModal();
	}
}
