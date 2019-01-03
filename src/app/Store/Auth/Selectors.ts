import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './AuthState.model';
import { User } from '../../Models/User.model';
import { Error } from '../../Models/Error.model';

interface AuthStatus {
    logged: boolean;
    error: Error;
}

export const getAuthState = createFeatureSelector<AuthState>('authentication');

export const getLoggedUser = createSelector(
    getAuthState,
    (state: AuthState): User => {
        return state.user;
    }
);

export const getAuthIsPending = createSelector(
    getAuthState,
    (state: AuthState): boolean => {
        return state.isPending;
    }
);

export const getAuthStatus = createSelector(
  getAuthState,
  (state: AuthState): AuthStatus => {
      return {
          logged: state.logged,
          error: state.error
      }
  }
);
