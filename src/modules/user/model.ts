export interface UserRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UserWithoutPassword {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserRegisterResponse {
    success: boolean;
    error?: string;
    user?: UserWithoutPassword;
    fields?: {
        field: string;
        constraints: {
            [type: string]: string;
        };
    };
}
