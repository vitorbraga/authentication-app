export const SET_USER_ID = 'SET_USER_ID';

export interface UserRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export type UserRegisterResponse = {
    success: true;
    user?: User;
    error?: never;
    fields?: never;
} | {
    success: false;
    user?: never;
    error?: string;
    fields?: {
        field: string;
        constraints: {
            [type: string]: string;
        };
    }[];
};

export type GetUserResponse = {
    success: true;
    user: User;
    error: never;
} | {
    success: false;
    user: never;
    error: string;
};

interface SetUserIdAction {
    type: typeof SET_USER_ID;
    payload: number | null;
}

export interface UserState {
    userId: number | null;
}

export type ActionTypes = SetUserIdAction;
