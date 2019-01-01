import { Component, OnInit } from '@angular/core';
import { Movie } from '../../Models/Movie.model';
import { Movies } from '../../Services/Movies.service';
import { MovieTitle } from '../../Pips/MovieTitle';

const MOVIE_SUMMARY_PATH: string = 'Cinema/MovieSummary';

@Component({
  selector: 'home',
  templateUrl: './Home.page.html',
  styleUrls: ['./Home.page.scss'],
  providers: [ MovieTitle, ]
})

export class Home implements OnInit {

    constructor(private moviesService: Movies){

    }

	ngOnInit(){

	}

}

