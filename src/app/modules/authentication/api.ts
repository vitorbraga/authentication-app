import { LoginResponse } from './model';
import { headersBuilder } from '../../utils/helpers';

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
}
