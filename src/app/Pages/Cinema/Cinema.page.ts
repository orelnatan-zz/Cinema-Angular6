import { Component, ViewChild, OnInit } from '@angular/core';
import { Movies } from '../../Services/Movies.service';
import { Movie } from '../../Models/Movie.modal';
import { MovieTitle } from '../../Pips/MovieTitle';
import { Modal } from '../../Core/Modal';
import { Success } from '../../Modals/Success';
import { Dialog } from '../../Modals/Dialog';
import { MovieEditor } from '../../Modals/MovieEditor';
import { Failure } from '../../Modals/Failure';
import { Loader } from '../../Modals/Loader';

@Component({
  selector: 'cinema',
  templateUrl: './Cinema.page.html',
  styleUrls: ['./Cinema.page.scss'],
  providers: [ Movies, MovieTitle, ]
})

export class Cinema implements OnInit {
  @ViewChild('dynamicModal') dynamicModal: Modal;

  showLoader: boolean;
  
  moviesList: Array<Movie>;
  movieId: number;

  constructor(private moviesService: Movies, 
              private movieTitlePipe: MovieTitle){
    
  }

  ngOnInit(){
    this.dynamicModal.show(Loader);

    this.moviesService.getMovies().subscribe((response: any) => {
        this.moviesList = response;
        this.dynamicModal.hide();
    })
  }

  handleRemove(id: number): void {
    this.movieId = id;

    let dialogOutputs = {
        onClose: () => { 
            this.dynamicModal.hide()
        },
        onApprove: () => {
            this.deleteMovie(this.movieId);
            this.dynamicModal.hide().then(() => {
                this.dynamicModal.show(Success);
            });  
        }
    };
    this.dynamicModal.show(Dialog, {}, dialogOutputs);  
  }

  handleEdit(id: number): void {

    let editorInputs = {
      movie: {...this.moviesList.find(movie => movie.id == id)},
    }

    let editorOutputs = {
      onClose: () => {
        this.dynamicModal.hide();
      },
      onSave: (movie: Movie) => {
        this.dynamicModal.hide().then(() => {
            this.isMovieExist(movie.id) ? this.updateExistingMovie(movie) : this.createNewMovie(movie);
        });
      }
    }

    this.dynamicModal.show(MovieEditor, editorInputs, editorOutputs);
  }

  openEditorModal(): void {
    let editorInputs = {
      movie: this.initializeNewMovie(),
    };

    let editorOutputs = {
      onClose: () => {
        this.dynamicModal.hide();
      },
      onSave: (movie: Movie) => {
        this.dynamicModal.hide().then(() => {
            this.isMovieExist(movie.id) ? this.updateExistingMovie(movie) : this.createNewMovie(movie);
        });
      }
    }

    this.dynamicModal.show(MovieEditor, editorInputs, editorOutputs);   
  }

  deleteMovie(id: number): void {
    let index = this.moviesList.findIndex(movie => movie.id == id);
    this.moviesList.splice(index, 1);
  }

  isMovieExist(id: number): boolean {
    return this.moviesList.map(movie => movie.id).indexOf(id) != -1 ? true : false;
  }

  isTitleExist(title: string, excludes: Array<string>): boolean {
    let transformedExcludes = excludes.map(title => this.movieTitlePipe.transform(title));
    let filterdList = this.moviesList.filter(item => !transformedExcludes.includes(this.movieTitlePipe.transform(item.title)));
       
    return filterdList.map(movie => this.movieTitlePipe.transform(movie.title))
           .indexOf(this.movieTitlePipe.transform(title)) != -1 ? true : false; 
  }

  updateExistingMovie(updates: Movie): void {
    let currentMovie: Movie = this.moviesList.find(movie => movie.id == updates.id);
    
    if(this.isTitleExist(updates.title, [currentMovie.title])) {
        this.dynamicModal.show(Failure);
        return;
    }

    Object.keys(currentMovie).forEach((key) => { 
        currentMovie[key] = updates[key]; 
    });

    this.dynamicModal.show(Success);
  }
  
  createNewMovie(movie: Movie): void {
    if(this.isTitleExist(movie.title, [])) {
      this.dynamicModal.show(Failure);
      return;
    }

    this.moviesList.unshift(movie);
    this.dynamicModal.show(Success);
  }

  initializeNewMovie(): Movie {
      return {
          adult: false,
          backdrop_path: '',
          genre_ids: [],
          id: Math.max.apply(Math, this.moviesList.map(movie => movie.id)) + 1,
          original_language: null,
          original_title: '',
          overview: '',
          popularity: null,
          poster_path: '',
          director: '',
          release_date: '',
          title: '',
          video: false,
          vote_average: null,
          vote_count: null
      }
  }

}
