import { Action } from '@ngrx/store';
import { Movie } from '../../Models/Movie.model';
import { Alert } from '../../Models/Alert.model';

export enum ActionTypes {
	LOAD = '[MOVIES] Load',
	REJECTED = '[MOVIES] Rejected',
	READY = '[MOVIES] Ready',
	SUBMIT = '[MOVIES] Submit',
    MOVIES_DIALOG = '[MOVIES] Dialog',
    MOVIES_FAILURE = '[MOVIES] Failure',
    MOVIES_SUCCESS = '[MOVIES] Success',
	CREATE_MOVIE = '[MOVIES] CreateMovie',
	REMOVE_MOVIE = '[MOVIES] RemoveMovie',
	UPDATE_MOVIE = '[MOVIES] UpdateMovie',
	ADD_FAVORITE = '[MOVIES] AddFavorite',
	REMOVE_FAVORITE = '[MOVIES] RemoveFavorite',
}

export class Load implements Action {
	readonly type = ActionTypes.LOAD;

	constructor(){}
}

export class Rejected implements Action {
    readonly type = ActionTypes.REJECTED;

    constructor(public payload: {
      	failure: Alert,
	}){}
}

export class Ready implements Action {
    readonly type = ActionTypes.READY;

    constructor(public payload: {
		movies: Array<Movie>,
    }){}
}

export class Submit implements Action {
    readonly type = ActionTypes.SUBMIT;

    constructor(public payload: {
		movie: Movie,
    }){}
}

export class UpdateMovie implements Action {
    readonly type = ActionTypes.UPDATE_MOVIE;

    constructor(public payload: {
		submitedMovie: Movie,
    }){}
}

export class CreateMovie implements Action {
    readonly type = ActionTypes.CREATE_MOVIE;

    constructor(public payload: {
		submitedMovie: Movie,
    }){}
}

export class RemoveMovie implements Action {
	readonly type = ActionTypes.REMOVE_MOVIE;

	constructor(public payload: {
        movieId: number,
        success: Alert
	}){}
}

export class MoviesDialog implements Action {
	readonly type = ActionTypes.MOVIES_DIALOG;

	constructor(public payload: {
		dialog: Alert,
	}){}
}

export class MoviesFailure implements Action {
	readonly type = ActionTypes.MOVIES_FAILURE;

	constructor(public payload: {
		failure: Alert,
	}){}
}

export class MoviesSuccess implements Action {
	readonly type = ActionTypes.MOVIES_SUCCESS;

	constructor(public payload: {
		success: Alert,
	}){}
}


export type Actions = Load 				| 
					  Rejected 			| 
					  Ready 			| 
					  Submit 			| 
					  UpdateMovie 		| 
					  CreateMovie 		| 
					  RemoveMovie 		| 
					  MoviesDialog 		| 
					  MoviesFailure 	| 
					  MoviesSuccess;
