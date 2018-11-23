import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { activateSource } from './source';
import { remoteSelection } from './source';

@Component({
  selector: 'input-select',
  templateUrl: './inputSelect.component.html',
  styleUrls: ['./inputSelect.component.scss', '../inputs.styles.scss'],
})

export class InputSelect implements OnInit, AfterViewInit {

    @ViewChild('inputReference') inputReference: ElementRef;
    @ViewChild('subtitleReference') subtitleReference: ElementRef;

    @Input() items: Array<object>;
    @Input() title: string;
    @Input() subtitle: string;
    @Input() selected: number;
    @Input() validation: string;
    @Input() submitted: boolean;
    @Input() invalid: boolean;
    @Input() showTitle: boolean = true;
    @Input() showValidation: boolean = true;

    @Output() onChange: EventEmitter <any> = new EventEmitter();
    @Output() clear: EventEmitter <any> = new EventEmitter();

    constructor(private renderer: Renderer2){}

    ngOnInit(){
      activateSource();
    }

    ngAfterViewInit(){
      if(this.selected) this.selectItem(this.selected);
    }

    public clearSelection(){
      this.selectItem(-1);

      this.renderer.setStyle(this.subtitleReference.nativeElement, 'font-size', '16px');
      this.renderer.setStyle(this.subtitleReference.nativeElement, 'top', '32px');
    }

    public selectItem(id: number){
      let child: HTMLElement = document.getElementById(String(id));
      let parent: HTMLElement = this.inputReference.nativeElement;

      remoteSelection(child, parent); 
    }
    
}
