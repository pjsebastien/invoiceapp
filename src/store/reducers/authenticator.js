import {
    AUTHENTICATE,
    FETCH_REFRESH_TOKEN,
    SET_TRIAL_LOGIN,
    LOGOUT,
} from '../actions/authenticator';

const initialState = {
    userId: null,
    token: null,
    didTrialAutoLogin: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                ...state,
                userId: action.userId,
                token: action.token,
            };
        case SET_TRIAL_LOGIN:
            return {
                ...state,
                didTrialAutoLogin: true,
            };
        case FETCH_REFRESH_TOKEN:
            return {
                ...state,
                userId: action.userId,
                token: action.token,
                didTrialAutoLogin: true,
            };
        case LOGOUT:
            return {
                ...state,
                userId: null,
                token: null,
            };
        default:
            return state;
    }
};
