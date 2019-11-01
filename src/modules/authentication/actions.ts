import { SET_AUTH_TOKEN, ActionTypes } from './model';

export function setAuthToken(authToken: string | null): ActionTypes {
    return {
        type: SET_AUTH_TOKEN,
        payload: authToken
    };
}
