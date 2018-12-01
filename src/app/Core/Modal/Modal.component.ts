
import { Component, Input, Output, EventEmitter, Type } from '@angular/core';
import { DynamicChild } from '../../Models/DynamicChild.modal';
import { Resolve, ResolveData } from '@angular/router';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'modal',
  templateUrl: './Modal.component.html',
  styleUrls: ['./Modal.component.scss']
})

export class Modal {
  @Input() allowManualClose: boolean = true;
  
  child: DynamicChild = {
    instance: null,
    inputs: {},
    outputs: {}
  };

  showBackwardsAnimation: boolean = false;
  modalIsShown: boolean = false;

  public show(instance: Type<any>, inputs: object = {}, outputs: object = {}): void {
    this.child.instance = instance;
    this.child.inputs = inputs;
    this.child.outputs = outputs;

    this.modalIsShown = true;
  }

  //  Using Promise
  public async hide(): Promise<object> {    
    this.showBackwardsAnimation = true;
    
     return new Promise((resolve) => {
          setTimeout(() => {
              this.modalIsShown = false;
              this.showBackwardsAnimation = false;
              resolve({});
        }, 300);
    })
  }

  // // Using Observable
  // public hide(): Observable<Object> {    
  //   this.showBackwardsAnimation = true;
    
  //   return new Observable((observer: Observer<Object>) => {
  //     setTimeout(() => {
  //           this.modalIsShown = false;
  //           this.showBackwardsAnimation = false;
  //           observer.next({});
  //           observer.complete();
  //     }, 300);
  //   })
  // }



}

