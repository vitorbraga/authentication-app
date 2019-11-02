import { Errors } from '../../utils/error-mapper';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

export interface LoginResponse {
    success: boolean;
    jwt?: string;
    error?: keyof Errors;
}

interface SetAuthTokenAction {
    type: typeof SET_AUTH_TOKEN;
    payload: string | null;
}

export interface AuthenticationState {
    authToken: string | null;
}

export type ActionTypes = SetAuthTokenAction;
