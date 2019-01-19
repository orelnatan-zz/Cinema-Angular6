import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from './MoviesState.model';
import { Movie } from '../../Models/Movie.model';
import { Alert } from '../../Models/Alert.model';

export const getMoviesState = createFeatureSelector<MoviesState>('movies');

export const getAllMovies = createSelector(
    getMoviesState,
    (state: MoviesState): Array<Movie> => {
        return state.movies;
    }
);

export const displayMode = createSelector(
    getMoviesState,
    (state: MoviesState): string => {
        return state.displayMode;
    }
);

export const getMoviesinProgress = createSelector(
    getMoviesState,
    (state: MoviesState): boolean => {
        return state.inProgress;
    }
);

export const getSuccess = createSelector(
    getMoviesState,
    (state: MoviesState): Alert => {
        return state.success;
    }
);

export const getFailure = createSelector(
    getMoviesState,
    (state: MoviesState): Alert => {
        return state.failure;
    }
);

export const getDialog = createSelector(
    getMoviesState,
    (state: MoviesState): Alert => {
        return state.dialog;
    }
);
