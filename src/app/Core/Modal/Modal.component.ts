import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './Modal.component.html',
  styleUrls: ['./Modal.component.scss']
})

export class Modal {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Input() allowManualClose: boolean = true;

  showBackwardsAnimation: boolean;
  renderModal: boolean;

  public openModal(): void {
    this.showBackwardsAnimation = false;
    this.renderModal = true;
  }

  public closeModal(): void {
    this.showBackwardsAnimation = true;

    setTimeout(() => {
      this.renderModal = false;
    }, 300);
  }

}

