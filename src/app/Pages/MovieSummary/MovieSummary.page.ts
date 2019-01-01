import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movies } from '../../Services/Movies.service';
import { Movie } from '../../Models/Movie.model';

const HOME_PATH: string = 'Cinema/Home';
const ERROR_NOTIFICATION: string = 'Server Error: unable to find movie, redirecting home page.';

@Component({
  selector: 'movie-summary',
  templateUrl: './MovieSummary.page.html',
  styleUrls: ['./MovieSummary.page.scss']
})

export class MovieSummary implements OnInit {
  movie: Movie;
  renderPage: boolean;

  constructor(private movies: Movies,
              private route: ActivatedRoute){

  }

  ngOnInit() {
    
  }

  
}

