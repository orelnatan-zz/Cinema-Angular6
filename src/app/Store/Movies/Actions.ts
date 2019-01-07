import { Action } from '@ngrx/store';
import { User } from '../../Models/User.model';
import { Status } from '../../Models/Status.model';
import { Route } from '../../Models/Route.model';
import { Movie } from '../../Models/Movie.model';

export enum ActionTypes {
    LOAD_MOVIES = '[MOVIES] Load',
    MOVIES_LOAD_FAILED = '[MOVIES] failure',
    MOVIES_LOAD_SUCCESS = '[MOVIES] Success',
    CREATE_MOVIE = '[MOVIES] Create',
    REMOVE_MOVIE = '[MOVIES] Remove',
	UPDATE_MOVIE = '[MOVIES] Update',
	ADD_FAVORITE = '[MOVIES] AddFavorite',
	REMOVE_FAVORITE = '[MOVIES] RemoveFavorite',
}

export class LoadMovies implements Action {
	readonly type = ActionTypes.LOAD_MOVIES;

	constructor(){}
}

export class MoviesLoadFailed implements Action {
    readonly type = ActionTypes.MOVIES_LOAD_FAILED;

    constructor(public payload: {
		 error: Status 
	}){}
}

export class MoviesLoadSuccess implements Action {
    readonly type = ActionTypes.MOVIES_LOAD_SUCCESS;

    constructor(public payload: { 
		movies: Array<Movie>, 
        success: Status 
    }){}
}

export class RemoveMovie implements Action {
	readonly type = ActionTypes.REMOVE_MOVIE;

	constructor(public payload: {
		movieId: number,
	}){}
}

export type Actions = LoadMovies | MoviesLoadFailed | MoviesLoadSuccess | RemoveMovie;