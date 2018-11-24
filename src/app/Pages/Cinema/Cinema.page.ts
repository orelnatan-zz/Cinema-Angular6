import { Component, ViewChild, OnInit } from '@angular/core';
import { Movies } from '../../Services/Movies.service';
import { Movie } from '../../Models/Movie.modal';
import { Purifier } from '../../Pips/Purifier';

@Component({
  selector: 'cinema',
  templateUrl: './Cinema.page.html',
  styleUrls: ['./Cinema.page.scss'],
  providers: [ Movies, Purifier, ]
})

export class Cinema implements OnInit {
  showLoader: boolean;
  showDialog: boolean;
  showSuccess: boolean;
  showEditor: boolean;
  showFailure: boolean;

  moviesList: Array<Movie>;
  movieId: number;
  movie: Movie;

  constructor(private moviesService: Movies, 
              private purifierPipe: Purifier,){
    
  }

  ngOnInit(){
    this.showLoader = true;

    this.moviesService.getMovies().subscribe((response: any) => {
      response[1].title = '@@THIS is a Mov333iE!!';
      this.moviesList = response;
      this.showLoader = false; 
    })
  }

  handleRemove(id: number){
    this.movieId = id;
    this.showDialog = true;
  }

  handleEdit(id: number){
    this.movie = {...this.moviesList.find(movie => movie.id == id)};      //Copy book by value only...
    this.showEditor = true;
  }

  deleteMovie(id: number){
    let index = this.moviesList.findIndex(movie => movie.id == id);
    this.moviesList.splice(index, 1);

    this.showDialog = false;
    this.showSuccess = true;
  }

  isMovieExist(id: number): boolean{
    return this.moviesList.map(movie => movie.id).indexOf(id) != -1 ? true : false;
  }

  isTitleExist(title: string, excludes: Array<string>): boolean {
    let transformedExcludes = excludes.map(title => this.purifierPipe.transform(title));
    let filterdList = this.moviesList.filter(item => !transformedExcludes.includes(this.purifierPipe.transform(item.title)));
       
    return filterdList.map(movie => this.purifierPipe.transform(movie.title))
           .indexOf(this.purifierPipe.transform(title)) != -1 ? true : false; 
  }

  updateExistingMovie(updates: Movie){
    let currentMovie: Movie = this.moviesList.find(movie => movie.id == updates.id);
    
    if(this.isTitleExist(updates.title, [currentMovie.title])) {
        this.showFailure = true;
        return;
    }

    Object.keys(currentMovie).forEach((key) => { 
        currentMovie[key] = updates[key]; 
    });
    this.showEditor = false;
    this.showSuccess = true;
  }
  
  createNewMovie(movie: Movie){

  }

}
