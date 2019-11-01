import { UserRegister, UserRegisterResponse } from './model';
import { headersBuilder } from '../../utils/helpers';

const SERVER_BASE_URL = 'http://localhost:4000';

export const registerUser = async (user: UserRegister): Promise<UserRegisterResponse> => {
    const options = {
        headers: headersBuilder().with('Content-Type', 'application/json').with('Accept', 'application/json').build(),
        method: 'POST',
        body: JSON.stringify(user)
    };
    const response = await fetch(`${SERVER_BASE_URL}/user`, options);
    const data = await response.json();

    return data;
};
