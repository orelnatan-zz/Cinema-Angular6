import { AuthState } from './Auth/AuthState.model';
import { MoviesState } from './Movies/MoviesState.model';

export interface AppState {
	auth: AuthState,
	movies: MoviesState
}
