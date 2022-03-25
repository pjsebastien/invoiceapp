import axios from '../services/axios-instance';
import Keys from '../services/Keys';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SIGNUP = 'SIGNUP';
export const SET_TRIAL_LOGIN = 'SET_TRIAL_LOGIN';
export const FETCH_REFRESH_TOKEN = 'FETCH_REFRESH_TOKEN';
export const LOGOUT = 'LOGOUT';

export const signUp = (email, password) => {
    return async dispatch => {
        await axios
            .post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${Keys.firebase}`,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                },
            )
            .then(response => {
                saveDataToStorage(response.data.idToken, response.data.refreshToken),
                    dispatch({
                        type: SIGNUP,
                        userId: response.data.localId,
                        token: response.data.idToken,
                    });
            })
            .catch(error => {
                throw new Error(error.response.data.error.message);
            });
    };
};

const saveDataToStorage = (token, refreshToken) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            refreshToken: refreshToken,
        }),
    );
};

export const setDidTrial = () => {
    return {
        type: SET_TRIAL_LOGIN,
    };
};

export const fetchRefreshToken = refreshToken => {
    return dispatch => {
        axios
            .post(`https://securetoken.googleapis.com/v1/token?key=${Keys.firebase}`, {
                refreshToken: refreshToken,
                grantType: 'refresh_token',
            })
            .then(response => {
                dispatch({
                    type: FETCH_REFRESH_TOKEN,
                    token: response.data.id_token,
                    refreshToken: response.data.refresh_token,
                    userId: response.data.user_id,
                });
                saveDataToStorage(response.data.id_token, response.data.refresh_token);
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const logout = () => {
    AsyncStorage.removeItem('userData');
    return {
        type: LOGOUT,
    };
};
