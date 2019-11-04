export interface Errors {
    [Key: string]: string;
}

export const errors: Errors = {
    LOGIN_MISSING_CREDENTIALS: 'Missing credentials.',
    LOGIN_USER_NOT_FOUND: 'User not found.',
    LOGIN_UNMATCHED_EMAIL_PWD: 'Email and password do not match.',
    LOGIN_ENTER_EMAIL_PWD: 'Please enter your email and password.',
    REGISTER_REQUIRED_FIELD: 'This field is required.',
    REGISTER_INVALID_EMAIL: 'Invalid email.',
    REGISTER_PASSWORD_COMPLEXITY: 'Password must be at least 6 characters and it must contain numbers and letters.',
    REGISTER_PASSWORD_SIX_CHARS: 'Password must have at least 6 characters.',
    USER_NOT_FOUND: 'User not found.',
    PASSWORD_RESET_MISSING_EMAIL: 'Please provide an email.',
    PASSWORD_RESET_USER_NOT_FOUND: 'We could not find a user with the provided email.',
    PASSWORD_RESET_REQUIRED_FIELDS: 'Required fields.',
    PASSWORDS_DO_NOT_MATCH: 'Passwords do not match.',
    PASSWORD_TOKEN_REQUIRED: 'Password token is required.', // TODO fix this message
    PASSWORD_USER_ID_REQUIRED: 'Password user id required', // TODO fix this message
    PASSWORD_TOKEN_EXPIRED: 'Password token expired',
    EMAIL_INVALID: 'Email address is invalid. Please enter a valid email address.',
    PASSWORD_RESET_BAD_USER_ID: 'Invalid user ID.',
    PASSWORD_RESET_TOKEN_AND_ID_NOT_MATCH: 'Token and user ID do not match.', // TODO fix this message
    PASSWORD_RESET_MISSING_TOKEN_USERID: 'Missing token and/or user ID.',
    PASSWORD_RESET_TOKEN_USER_NOT_FOUND: 'We could not find a user with the provided token.'
};
