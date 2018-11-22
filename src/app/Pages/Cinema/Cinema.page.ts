import { Component, ViewChild, OnInit } from '@angular/core';
import { Movies } from '../../Services/Movies.service';
import { Movie } from '../../Models/Movie.modal';
import { Loader } from '../../Modals/Loader';
import { Dialog } from '../../Modals/Dialog';


import * as moment from 'moment';


@Component({
  selector: 'cinema',
  templateUrl: './Cinema.page.html',
  styleUrls: ['./Cinema.page.scss'],
  providers: [ Movies, ]
})

export class Cinema implements OnInit {
  @ViewChild('loaderReference') loaderReference: Loader;
  @ViewChild('DialogReference') DialogReference: Dialog;

  movies: Array<Movie>;

  constructor(private Movies: Movies){

  }

  ngOnInit(){
    this.loaderReference.showLoader();

    this.Movies.getMovies().subscribe((response: any) => {
      this.movies = response.results;
      this.loaderReference.hideLoader();
      console.log(this.movies);
    })
  }

  handleRemove(id: number){
    console.log(id);
    this.DialogReference.showDialog();
  }

}
