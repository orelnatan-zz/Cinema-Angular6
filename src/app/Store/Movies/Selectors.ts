import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Status } from '../../Models/Status.model';
import { MoviesState } from './MoviesState.model';
import { Movie } from '../../Models/Movie.model';

export const getMoviesState = createFeatureSelector<MoviesState>('movies');

export const getAllMovies = createSelector(
    getMoviesState,
    (state: MoviesState): Array<Movie> => {
        return state.movies;
    }
);

export const getIsPending = createSelector(
    getMoviesState,
    (state: MoviesState): boolean => {
        return state.isPending;
    }
);

export const getMoviesStatus = createSelector(
    getMoviesState,
    (state: MoviesState): Status => {
        return state.status;
    }
);