import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { activateSource } from './source';
import { remoteSelection } from './source';

@Component({
  selector: 'input-select',
  templateUrl: './InputSelect.component.html',
  styleUrls: ['./InputSelect.component.scss', '../inputs.styles.scss'],
})

export class InputSelect implements OnInit, AfterViewInit {

    @ViewChild('inputReference') inputReference: ElementRef;
    @ViewChild('subtitleReference') subtitleReference: ElementRef;

    @Input() items: Array<string>;
    @Input() title: string;
    @Input() subtitle: string;
    @Input() selected: string;
    @Input() validation: string;
    @Input() submitted: boolean;
    @Input() invalid: boolean;
    @Input() showTitle: boolean = true;
    @Input() showValidation: boolean = true;

    @Output() onChange: EventEmitter <any> = new EventEmitter();

    constructor(private renderer: Renderer2){}

    ngOnInit(){
      activateSource();
    }

    ngAfterViewInit(){
      if(this.selected) this.selectItem(this.selected);
    }

    public clearSelection(): void{
      this.selectItem('non');

      this.renderer.setStyle(this.subtitleReference.nativeElement, 'font-size', '16px');
      this.renderer.setStyle(this.subtitleReference.nativeElement, 'top', '32px');
    }

    public selectItem(id: string): void{
      let child: HTMLElement = document.getElementById(id);
      let parent: HTMLElement = this.inputReference.nativeElement;

      remoteSelection(child, parent); 
    }
    
}
