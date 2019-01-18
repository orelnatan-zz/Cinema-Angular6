import { Actions, ActionTypes } from './Actions';
import { MoviesState } from './MoviesState.model';
import { Movie } from '../../Models/Movie.model';
import { Alert } from '../../Models/Alert.model';

const initialState: MoviesState = {
	movies: [],
	inProgress: false,
	failure: { isShown: false } as Alert,
	dialog: { isShown: false } as Alert,
	success: { isShown: false } as Alert
}

export function MoviesReducer(state = initialState, action: Actions): MoviesState {
	switch(action.type){
		case ActionTypes.LOAD: {
			return {
				... state,
        		inProgress: true,
			};
		};
		case ActionTypes.READY: {
			return {
				... state,
				movies: action.payload.movies,
				inProgress: false,
			};
		};
		case ActionTypes.REJECTED: {
			return {
				... state,
                inProgress: false,
                failure: action.payload.failure
			};
		};
		case ActionTypes.SUBMIT: {
			return {
				... state,
                inProgress: true,
			};
		};
		case ActionTypes.MOVIES_DIALOG: {
			return {
				... state,
				dialog: action.payload.dialog
			};
        };
        case ActionTypes.MOVIES_FAILURE: {
			return {
				... state,
				failure: action.payload.failure,
				inProgress: false,
			};
        };
        case ActionTypes.MOVIES_SUCCESS: {
			return {
				... state,
				success: action.payload.success
			};
		};
		case ActionTypes.UPDATE_MOVIE: {
			state.movies[state.movies.findIndex(
								(movie: Movie) => movie.id == action.payload.submitedMovie.id
							)] = { ... action.payload.submitedMovie };
			return {
				... state,
				inProgress: false,
				success: action.payload.success
			};
		};
		case ActionTypes.CREATE_MOVIE: {
			state.movies.unshift({
							... action.payload.submitedMovie,
							id: Math.max.apply(Math, state.movies.map(
								(movie: Movie) => movie.id)
							) + 1
						});
			return {
				... state,
				inProgress: false,
				success: action.payload.success
			};
		};
		case ActionTypes.REMOVE_MOVIE: {
			state.movies.splice(state.movies
						.findIndex((movie: Movie) => {
							return movie.id == action.payload.movieId;
						}), 1);
			return {
				... state,
                dialog: { isShown: false },
                success: action.payload.success
			};
        };
		default: {
      		return {
				... state
			};
        };
	}


}
