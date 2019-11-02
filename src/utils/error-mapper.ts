export interface Errors {
    [Key: string]: string;
}

export const errors: Errors = {
    LOGIN_MISSING_CREDENTIALS: 'Missing credentials.',
    LOGIN_USER_NOT_FOUND: 'User not found.',
    LOGIN_UNMATCHED_EMAIL_PWD: 'Email and password do not match.',
    LOGIN_ENTER_EMAIL_PWD: 'Please enter your email and password.',
};
