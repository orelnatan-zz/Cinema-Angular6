import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, } from '@angular/router';
import { Dispatcher } from '../../Services/Dispatcher.service';
import { Loader } from '../../Modals/Loader';
import { Success } from '../../Modals/Success';
import { Route } from '../../Models/Route.model';
import { Failure } from '../../Modals/Failure';
import { Movie } from '../../Models/Movie.model';
import { Movies } from '../../Services/Movies.service';
import { MovieTitle } from '../../Pips/MovieTitle';

@Component({
  selector: 'cinema',
  templateUrl: './Cinema.page.html',
  styleUrls: ['./Cinema.page.scss'],
  providers: [ MovieTitle, ]
})

export class Cinema implements OnInit {
  @ViewChild('loaderRef') loaderRef: Loader;
  @ViewChild('successRef') successRef: Success;
  @ViewChild('failureRef') failureRef: Failure;
  
  moviesList: Array<Movie>;

  constructor(private router: Router,
              private moviesService: Movies,
              private dispatcher: Dispatcher,
              private movieTitlePipe: MovieTitle,) {

      this.dispatcher.onRedirect().subscribe((route: Route) => {
          this.router.navigate([route.path], {
              queryParams: route.queryParams,
          })
      })

      this.dispatcher.onMovieSubmited().subscribe((movie: Movie) => {
          this.isMovieExist(movie.id) ? this.updateExistingMovie(movie) : this.createNewMovie(movie)
      })

      this.dispatcher.onLoaderToggled().subscribe((isActive: boolean) => {
          isActive ? this.loaderRef.openModal() : this.loaderRef.closeModal();
      });


  }

  ngOnInit() {
    this.loaderRef.openModal();

    this.moviesService.getAllMovies().subscribe((response: Array<Movie>) => {
        this.moviesList = response;
        this.dispatcher.dispathDataChanged(this.moviesList);

        this.loaderRef.closeModal();
    })
  }

  isMovieExist(id: number): boolean{
    return this.moviesList.map(movie => movie.id).indexOf(id) != -1 ? true : false;
  }

  isTitleExist(title: string, excludes: Array<string>): boolean {
    let transformedExcludes = excludes.map(title => this.movieTitlePipe.transform(title));
    let filterdList = this.moviesList.filter(item => !transformedExcludes.includes(this.movieTitlePipe.transform(item.title)));

    return filterdList.map(movie => this.movieTitlePipe.transform(movie.title))
           .indexOf(this.movieTitlePipe.transform(title)) != -1;
  }

  updateExistingMovie(updates: Movie): void {
    let currentMovie: Movie = this.moviesList.find(movie => movie.id == updates.id);

    if(this.isTitleExist(updates.title, [currentMovie.title])) {
        this.failureRef.openModal();
        return;
    }

    Object.keys(currentMovie).forEach((key) => {
        currentMovie[key] = updates[key];
    });
    
    this.dispatcher.dispathDataChanged(this.moviesList);
    this.router.navigate(['Cinema/Home']);
    this.successRef.openModal();
  }

  createNewMovie(movie: Movie): void {
    if(this.isTitleExist(movie.title, [])) {
      return;
    }

    movie.id = Math.max.apply(Math, this.moviesList.map(movie => movie.id)) + 1;
    this.moviesList.unshift(movie);
  }
  
}
