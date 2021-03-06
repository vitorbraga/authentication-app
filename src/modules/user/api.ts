import { UserRegister, UserRegisterResponse, GetUserResponse, UserUpdate, UserUpdateResponse, User, FieldWithError } from './model';
import { headersBuilder, serverBaseUrl } from '../../utils/api-helper';
import { assertType } from 'typescript-is';
import { errorMapper } from '../../utils/messages-mapper';

export const registerUser = async (user: UserRegister): Promise<User | FieldWithError[]> => {
    const options = {
        headers: headersBuilder().with('Content-Type', 'application/json').with('Accept', 'application/json').build(),
        method: 'POST',
        body: JSON.stringify(user)
    };

    const response: Response = await fetch(`${serverBaseUrl}/user`, options);
    const data = await response.json();
    const userRegisterResponse: UserRegisterResponse = assertType<UserRegisterResponse>(data);

    if (userRegisterResponse.success) {
        return userRegisterResponse.user;
    } else if ('fields' in userRegisterResponse) {
        return userRegisterResponse.fields;
    } else {
        throw new Error(errorMapper[userRegisterResponse.error]);
    }
};

export const updateUser = async (userId: number, user: UserUpdate, authToken: string): Promise<User | FieldWithError[]> => {
    const options = {
        headers: headersBuilder()
            .with('Content-Type', 'application/json')
            .with('Accept', 'application/json')
            .withJwt(authToken)
            .build(),
        method: 'PATCH',
        body: JSON.stringify(user)
    };

    const response: Response = await fetch(`${serverBaseUrl}/user/${userId}`, options);
    const data = await response.json();
    const userUpdateResponse: UserUpdateResponse = assertType<UserUpdateResponse>(data);

    if (userUpdateResponse.success) {
        return userUpdateResponse.user;
    } else if ('fields' in userUpdateResponse) {
        return userUpdateResponse.fields;
    } else {
        throw new Error(errorMapper[userUpdateResponse.error]);
    }
};

export const getUser = async (userId: number, authToken: string): Promise<User> => {
    const options = {
        headers: headersBuilder().withJwt(authToken).build()
    };

    const response: Response = await fetch(`${serverBaseUrl}/user/${userId}`, options);
    const data = await response.json();
    const userResponse: GetUserResponse = assertType<GetUserResponse>(data);

    if (userResponse.success) {
        return userResponse.user;
    } else {
        throw new Error(errorMapper[userResponse.error]);
    }
};
