import { Component } from '@angular/core';
import { Books } from '../../Services/Books.service';
import * as moment from 'moment';

@Component({
  selector: 'library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
  providers: [Books, ]
})

export class Library {
    
  constructor(private Books: Books){
    this.Books.getBooks().subscribe((response) => {
      console.log(response);
    })
  }

}