import { doc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../db/firebase';

export const ADD_USER_INFO = 'ADD_USER_INFO';
export const GET_USER_INFO = 'GET_USER_INFO';

export const addUserInfo = (userInfo, userId, token) => {
    return dispatch => {
        try {
            setDoc(doc(db, 'userInfo', userId), userInfo);
            const newUserInfo = {
                logo: userInfo.logo,
                userName: userInfo.userName,
                familyName: userInfo.familyName,
                companyName: userInfo.companyName,
                adressStreet: userInfo.adressStreet,
                adressLineTwo: userInfo.adressLineTwo,
                adressCity: userInfo.adressCity,
                webSite: userInfo.webSite,
                mail: userInfo.mail,
                mobilePhone: userInfo.mobilePhone,
                fixPhone: userInfo.fixPhone,
                statut: userInfo.statut,
                siret: userInfo.siret,
                rcs: userInfo.rcs,
                tvaNumber: userInfo.tvaNumber,
                signImage: userInfo.signImage,
            };

            dispatch({ type: ADD_USER_INFO, userInfo: newUserInfo });
        } catch (error) {
            console.log(error);
        }
    };
};
export const getUserInfo = userId => {
    return async dispatch => {
        try {
            const docSnap = await getDoc(doc(db, 'userInfo', userId));

            const fetchedUserInfo = docSnap.data();

            dispatch({ type: GET_USER_INFO, userInfos: fetchedUserInfo });
        } catch (error) {
            console.log(error);
        }
    };
};
