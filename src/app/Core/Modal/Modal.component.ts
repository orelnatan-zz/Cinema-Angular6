
import { Component, Input } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './Modal.component.html',
  styleUrls: ['./Modal.component.scss']
})

export class Modal {

  @Input() isActive: boolean;

  public showModal(){
    this.isActive = true;
  }

  public hideModal(){
    this.isActive = false;
  }

}












// glass = 'https://www.grassvalley.com/home/img/empty_192x108.png';
