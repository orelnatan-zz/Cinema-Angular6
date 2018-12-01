
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './Modal.component.html',
  styleUrls: ['./Modal.component.scss']
})

export class Modal {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Input() allowManualClose: boolean = true;

  showBackwardsAnimation: boolean = false;

  public closeModal(): void {    
    this.showBackwardsAnimation = true;
    
    setTimeout(() => {
      this.onClose.emit();
    }, 300);
  }

}

