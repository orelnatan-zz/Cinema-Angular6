import { Actions, ActionTypes } from './Actions';
import { MoviesState } from './MoviesState.model';
import { Movie } from '../../Models/Movie.model';
import { Alert } from '../../Models/Alert.model';

const initialState: MoviesState = {
	movies: [],
	trash: [],
	displayMode: null,
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
				displayMode: action.payload.displayMode
			};
		};
		case ActionTypes.READY: {
			const movies = action.payload.movies.filter((movie: Movie) => {
				return state.trash.indexOf(movie.id) == -1;
			});

			return {
				... state,
				movies: movies,
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
		case ActionTypes.TOGGLE: {
			return {
				... state,
                inProgress: true,
			};
		};
		case ActionTypes.FAVORITE: {
			return {
				... state,
				inProgress: false,
				success: action.payload.success
			};
		};
		case ActionTypes.UNFAVORITE: {
			return {
				... state,
				inProgress: false,
			};
		};
		case ActionTypes.DIALOG: {
			return {
				... state,
				dialog: action.payload.dialog
			};
        };
        case ActionTypes.FAILURE: {
			return {
				... state,
				failure: action.payload.failure,
				inProgress: false,
			};
        };
        case ActionTypes.SUCCESS: {
			return {
				... state,
				success: action.payload.success,
				inProgress: false,
			};
		};
		case ActionTypes.UPDATE: {
			state.movies[state.movies.findIndex(
						(movie: Movie) => movie.id == action.payload.submitedMovie.id
					)] = { ... action.payload.submitedMovie };
			return {
				... state,
				inProgress: false,
				success: action.payload.success
			};
		};
		case ActionTypes.CREATE: {
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
		case ActionTypes.REMOVE: {
			state.trash.push(action.payload.movieId);
			const movies = state.movies.filter((movie: Movie) => {
						return state.trash.indexOf(movie.id) == -1;
					});
			return {
				... state,
				movies: movies,
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


// state.movies.splice(state.movies
			// 			.findIndex((movie: Movie) => {
			// 				return movie.id == action.payload.movieId;
			// 			}), 1);