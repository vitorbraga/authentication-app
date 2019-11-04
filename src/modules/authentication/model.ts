import { Errors } from '../../utils/error-mapper';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

export type LoginResponse = {
    success: true;
    jwt: string;
    error: never;
} | {
    success: false;
    jwt: never;
    error: keyof Errors;
};

export type BaseResponse = {
    success: true;
    error: never;
} | {
    success: false;
    error: keyof Errors;
};

export type PasswordRecoveryResponse = BaseResponse;

export type ChangePasswordTokenResponse = BaseResponse;

export type CheckPasswordTokenResponse = BaseResponse;

interface SetAuthTokenAction {
    type: typeof SET_AUTH_TOKEN;
    payload: string | null;
}

export interface AuthenticationState {
    authToken: string | null;
}

export type ActionTypes = SetAuthTokenAction;
