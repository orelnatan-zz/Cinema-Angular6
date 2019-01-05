import { Component, ViewChild } from '@angular/core';
import { Modal } from '../../Core/Modal';

@Component({
  selector: 'loader',
  templateUrl: './Loader.modal.html',
  styleUrls: ['./Loader.modal.scss']
})

export class Loader {
	@ViewChild('modalRef') modalRef: Modal;

	public showLoader(): void {
		this.modalRef.openModal();
	}

	public hideLoader(): void {
		this.modalRef.closeModal();
	}
}
