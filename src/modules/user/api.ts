import { UserRegister, UserRegisterResponse, GetUserResponse, UserUpdate, UserUpdateResponse } from './model';
import { headersBuilder, serverBaseUrl } from '../../utils/api-helper';

export const registerUser = async (user: UserRegister): Promise<UserRegisterResponse> => {
    const options = {
        headers: headersBuilder().with('Content-Type', 'application/json').with('Accept', 'application/json').build(),
        method: 'POST',
        body: JSON.stringify(user)
    };
    const response = await fetch(`${serverBaseUrl}/user`, options);
    const data = await response.json();

    return data;
};

export const updateUser = async (userId: number, user: UserUpdate, authToken: string): Promise<UserUpdateResponse> => {
    const options = {
        headers: headersBuilder()
            .with('Content-Type', 'application/json')
            .with('Accept', 'application/json')
            .withJwt(authToken)
            .build(),
        method: 'PATCH',
        body: JSON.stringify(user)
    };
    const response = await fetch(`${serverBaseUrl}/user/${userId}`, options);
    const data = await response.json();

    return data;
};

export const getUser = async (userId: number, authToken: string): Promise<GetUserResponse> => {
    try {
        const options = {
            headers: headersBuilder().withJwt(authToken).build()
        };
        const response = await fetch(`${serverBaseUrl}/user/${userId}`, options);
        const data = await response.json();

        return data;
    } catch (error) {
        return { success: false } as GetUserResponse;
    }
};
