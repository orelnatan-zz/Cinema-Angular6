import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'success',
  templateUrl: './Success.modal.html',
  styleUrls: ['./Success.modal.scss']
})

export class Success implements OnInit, OnDestroy {

  ngOnInit(){
    console.log('Success-ngOnInit');
  }

  ngOnDestroy(){
    console.log('Success-ngOnDestroy');
  }
}
