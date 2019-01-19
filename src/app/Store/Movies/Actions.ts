import { Action } from '@ngrx/store';
import { Movie } from '../../Models/Movie.model';
import { Alert } from '../../Models/Alert.model';

export enum ActionTypes {
	LOAD = '[MOVIES] Load',
	REJECTED = '[MOVIES] Rejected',
	READY = '[MOVIES] Ready',
	SUBMIT = '[MOVIES] Submit',
    DIALOG = '[MOVIES] Dialog',
    FAILURE = '[MOVIES] Failure',
    SUCCESS = '[MOVIES] Success',
	CREATE = '[MOVIES] Create',
	REMOVE = '[MOVIES] Remove',
	UPDATE = '[MOVIES] Update',
	TOGGLE = '[MOVIES] Toggle',
	FAVORITE = '[MOVIES] Favorite',
	UNFAVORITE = '[MOVIES] UnFavorite',
}

export class Load implements Action {
	readonly type = ActionTypes.LOAD;

	constructor(public payload: {
		displayMode: string,
	}){}
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

export class Toggle implements Action {
    readonly type = ActionTypes.TOGGLE;

    constructor(public payload: {
		movie: Movie
    }){}
}

export class Favorite implements Action {
    readonly type = ActionTypes.FAVORITE;

    constructor(public payload: {
		movie: Movie,
		success: Alert
    }){}
}

export class UnFavorite implements Action {
    readonly type = ActionTypes.UNFAVORITE;

    constructor(public payload: {
		favoriteId: number
    }){}
}

export class Update implements Action {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload: {
		submitedMovie: Movie,
		success: Alert
    }){}
}

export class Create implements Action {
    readonly type = ActionTypes.CREATE;

    constructor(public payload: {
		submitedMovie: Movie,
		success: Alert
    }){}
}

export class Remove implements Action {
	readonly type = ActionTypes.REMOVE;

	constructor(public payload: {
        movieId: number,
        success: Alert
	}){}
}

export class Dialog implements Action {
	readonly type = ActionTypes.DIALOG;

	constructor(public payload: {
		dialog: Alert,
	}){}
}

export class Failure implements Action {
	readonly type = ActionTypes.FAILURE;

	constructor(public payload: {
		failure: Alert,
	}){}
}

export class Success implements Action {
	readonly type = ActionTypes.SUCCESS;

	constructor(public payload: {
		success: Alert,
	}){}
}


export type Actions = Load 			| 
					  Rejected 		| 
					  Ready 		| 
					  Submit 		| 
					  Update 		| 
					  Create 		| 
					  Remove 		|
					  Dialog 		|
					  Success		|
					  Failure 		|
					  Toggle		|	 
					  Favorite		|
					  UnFavorite; 
					  
