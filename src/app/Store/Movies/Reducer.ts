import { Actions, ActionTypes } from './Actions';
import { MoviesState } from './MoviesState.model';
import { Movie } from '../../Models/Movie.model';

const initialState: MoviesState = {
	movies: [],
	inProgress: null,
	failure: null,
}

export function MoviesReducer(state = initialState, action: Actions): MoviesState {
	switch(action.type){
		case ActionTypes.LOAD_MOVIES: {
			return {
				    ... state,
        		inProgress: true,
			}
		};
		case ActionTypes.MOVIES_LOAD_SUCCESS: {
			return {
				movies: action.payload.movies,
				inProgress: false,
				failure: action.payload.showFailure
			}
		};
		case ActionTypes.MOVIES_LOAD_FAILURE: {
			return {
				movies: [],
				inProgress: false,
				failure: action.payload.showFailure
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
