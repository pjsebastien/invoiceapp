import axios from '../services/axios-instance';

export const ADD_USER_INFO = 'ADD_USER_INFO';

export const addUserInfo = (userInfo, userId, token) => {
    return dispatch => {
        axios
            .post(`users/${userId}/userInfo.json?auth=${token}`, userInfo)
            .then(response => {
                console.log(userInfo);
                const newUserInfo = {
                    id: response.data.name,
                    username: userInfo.username,
                    companyname: userInfo.companyname,
                    adressStreet: userInfo.adressStreet,
                    adressLineTwo: userInfo.adressLineTwo,
                    adressCity: userInfo.adressCity,
                };
                dispatch({ type: ADD_USER_INFO, userInfo: newUserInfo });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
