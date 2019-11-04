import { LoginResponse, PasswordRecoveryResponse, CheckPasswordTokenResponse, ChangePasswordTokenResponse } from './model';
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

export const passwordRecovery = async (email: string): Promise<PasswordRecoveryResponse> => {
    const options = {
        headers: headersBuilder().with('Content-Type', 'application/json').with('Accept', 'application/json').build(),
        method: 'POST',
        body: JSON.stringify({ email })
    };
    const response = await fetch(`${SERVER_BASE_URL}/auth/password-recovery`, options);
    const data = await response.json();

    return data;
};

export const changePasswordWithToken = async (newPassword: string, token: string, userId: string): Promise<ChangePasswordTokenResponse> => {
    const options = {
        headers: headersBuilder().with('Content-Type', 'application/json').with('Accept', 'application/json').build(),
        method: 'POST',
        body: JSON.stringify({ newPassword, token, userId })
    };
    const response = await fetch(`${SERVER_BASE_URL}/auth/reset-password`, options);
    const data = await response.json();

    return data;
};

export const checkValidPasswordResetToken = async (token: string, userId: string): Promise<CheckPasswordTokenResponse> => {
    const options = {
        headers: headersBuilder().with('Content-Type', 'application/json').with('Accept', 'application/json').build()
    };
    const response = await fetch(`${SERVER_BASE_URL}/auth/check-password-token/${token}/${userId}`, options);
    const data = await response.json();

    return data;
};
