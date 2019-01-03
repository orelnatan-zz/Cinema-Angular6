import { Actions, ActionTypes } from './Actions';
import { AuthState } from './AuthState.model';

const initialState: AuthState = {
    logged: false,
    user: null,
    isPending: false,
    error: null
}

export function AuthReducer(state = initialState, action: Actions): AuthState {
    switch(action.type) {
        case ActionTypes.LOGIN: {
            return {
                ... state,
                isPending: true,
            };
        };
        case ActionTypes.LOGOUT: {
            return {
                ... initialState,
            };
        };
        case ActionTypes.LOGIN_FAILED: {
            return {
                ... state,
                logged: false,
                isPending: false,
                error: action.payload.error
            };
        };
        case ActionTypes.LOGIN_SUCCESS: {
            return {
                user: action.payload.user,
                logged: true,
                isPending: false,
                error: null
            }
        }
    }
}

