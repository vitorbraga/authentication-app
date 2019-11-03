import { LoginResponse, PasswordResetResponse, CheckPasswordTokenResponse } from './model';
import { headersBuilder } from '../../utils/api-helper';

const SERVER_BASE_URL = 'http://localhost:4000';

export const authenticate = async (username: string, password: string): Promise<LoginResponse> => {
    const options = {
        headers: headersBuilder().with('Content-Type', 'application/json').with('Accept', 'application/json').build(),
        method: 'POST',
        body: JSON.stringify({ username, password })
    };
    const response = await fetch(`${SERVER_BASE_URL}/auth/login`, options);
    const data = await response.json();

    return data;
};

export const passwordReset = async (email: string): Promise<PasswordResetResponse> => {
    const options = {
        headers: headersBuilder().with('Content-Type', 'application/json').with('Accept', 'application/json').build(),
        method: 'POST',
        body: JSON.stringify({ email })
    };
    const response = await fetch(`${SERVER_BASE_URL}/auth/password-reset`, options);
    const data = await response.json();

    return data;
};

export const checkValidPasswordResetToken = async (token: string): Promise<CheckPasswordTokenResponse> => {
    const options = {
        headers: headersBuilder().with('Content-Type', 'application/json').with('Accept', 'application/json').build()
    };
    const response = await fetch(`${SERVER_BASE_URL}/auth/check-password-token/${token}`, options);
    const data = await response.json();

    return data;
};
