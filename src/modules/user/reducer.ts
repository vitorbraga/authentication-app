import { SET_USER_ID, ActionTypes, UserState } from './model';

const initialState: UserState = {
    userId: null
};

export function userReducer(state = initialState, action: ActionTypes): UserState {
    switch (action.type) {
        case SET_USER_ID:
            return {
                userId: action.payload
            };
        default:
            return state;
    }
}
