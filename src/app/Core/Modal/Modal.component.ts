import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './Modal.component.html',
  styleUrls: ['./Modal.component.scss', ]
})

export class Modal {
	@Input() allowManualClose: boolean = true;
	@Output() onClose: EventEmitter<void> = new EventEmitter();

	showBackwardsAnimation: boolean = false;
	public renderModal: boolean;

	public openModal(): void {
		this.showBackwardsAnimation = false;
		this.renderModal = true;
	}

	public closeModal(): void {
		this.showBackwardsAnimation = true;

		setTimeout(() => {
			this.onClose.emit();
			this.renderModal = false;
		}, 300);
	}
}

