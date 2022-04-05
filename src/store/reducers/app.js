import { ADD_USER_INFO, GET_USER_INFO } from '../actions/userInfo';

const initialState = {
    userInfo: [],
    invoices: [0, 0, 0],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo,
            };
        case GET_USER_INFO:
            const fetchedUserInfo = action.userInfos;
            return {
                ...state,
                userInfo: fetchedUserInfo,
            };
        default:
            return state;
    }
};
