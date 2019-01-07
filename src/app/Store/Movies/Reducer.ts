import { Actions, ActionTypes } from './Actions';
import { MoviesState } from './MoviesState.model';
import { Status } from '../../Models/Status.model';
import { Movie } from '../../Models/Movie.model';

const initialState: MoviesState = {
	movies: [],
	isPending: false,
	status: {} as Status,
}

export function MoviesReducer(state = initialState, action: Actions): MoviesState {
	switch(action.type){
		case ActionTypes.LOAD_MOVIES: {
			return {
				... state,
        isPending: true,
			}
		};
		case ActionTypes.MOVIES_LOAD_SUCCESS: {
			return {
				movies: action.payload.movies,
				isPending: false,
				status: action.payload.success
			}
		};
		case ActionTypes.MOVIES_LOAD_FAILED: {
			return {
				movies: [],
				isPending: false,
				status: action.payload.error
			}
		};
		case ActionTypes.REMOVE_MOVIE: {
			state.movies.splice(state.movies
						.findIndex((movie: Movie) => {
							return movie.id == action.payload.movieId;
						}), 1);
			return {
				... state,
			};
		};
		default: {
      return {
				... state
			}
        };
	}


}
