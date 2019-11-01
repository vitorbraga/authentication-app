import { SET_USER_ID, ActionTypes } from './model';

export function setUserId(userId: number | null): ActionTypes {
    return {
        type: SET_USER_ID,
        payload: userId
    };
}
