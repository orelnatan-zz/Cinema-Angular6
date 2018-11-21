import { Component } from '@angular/core';
import { Movies } from '../../Services/Movies.service';
import * as moment from 'moment';

@Component({
  selector: 'cinema',
  templateUrl: './Cinema.page.html',
  styleUrls: ['./Cinema.page.scss'],
  providers: [ Movies, ]
})

export class Cinema {

  constructor(private Movies: Movies){
    this.Movies.getMovies().subscribe((response) => {
      console.log(response);
    })
  }

}
