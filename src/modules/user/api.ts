import { UserRegister, UserRegisterResponse, GetUserResponse } from './model';
import { headersBuilder, baseUrl } from '../../utils/api-helper';

export const registerUser = async (user: UserRegister): Promise<UserRegisterResponse> => {
    const options = {
        headers: headersBuilder().with('Content-Type', 'application/json').with('Accept', 'application/json').build(),
        method: 'POST',
        body: JSON.stringify(user)
    };
    const response = await fetch(`${baseUrl}/user`, options);
    const data = await response.json();

    return data;
};

export const getUser = async (userId: number, authToken: string): Promise<GetUserResponse> => {
    const options = {
        headers: headersBuilder().withJwt(authToken).build()
    };
    const response = await fetch(`${baseUrl}/user/${userId}`, options);
    const data = await response.json();

    return data;
};
