import { UserRegister, UserRegisterResponse, GetUserResponse } from './model';
import { headersBuilder } from '../../utils/api-helper';

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

export const getUser = async (userId: number, authToken: string): Promise<GetUserResponse> => {
    const options = {
        headers: headersBuilder().withJwt(authToken).build()
    };
    const response = await fetch(`${SERVER_BASE_URL}/user/${userId}`, options);
    const data = await response.json();

    return data;
};
