import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    addDoc,
    col,
    collection,
    deleteDoc,
} from 'firebase/firestore';
import { db } from '../../db/firebase';

export const ADD_CUSTOMER_INFO = 'ADD_CUSTOMER_INFO';
export const GET_CUSTOMERS = 'GET_CUSTOMERS';
export const PUT_CUSTOMER_INFO = 'PUT_CUSTOMER_INFO';
export const DELETE_CUSTOMER = 'PUT_CUSTOMER_INFO';

export const addCustomerInfo = (userId, customerInfo, token) => {
    return dispatch => {
        try {
            addDoc(collection(db, 'userRessources', userId, 'customer'), customerInfo);
            const newCustomerInfo = {
                customerType: customerInfo.customerType,
                userName: customerInfo.userName,
                familyName: customerInfo.familyName,
                companyName: customerInfo.companyName,
                adressStreet: customerInfo.adressStreet,
                adressLineTwo: customerInfo.adressLineTwo,
                adressCity: customerInfo.adressCity,
                deliveryAdressStreet: customerInfo.deliveryAdressStreet,
                deliveryAdressLineTwo: customerInfo.deliveryAdressLineTwo,
                deliveryAdressCity: customerInfo.deliveryAdressCity,
                mail: customerInfo.mail,
                phone: customerInfo.phone,
                siret: customerInfo.siret,
                tvaNumber: customerInfo.tvaNumber,
                customerDetails: customerInfo.customerDetails,
            };

            dispatch({ type: ADD_CUSTOMER_INFO, customerInfo: newCustomerInfo });
        } catch (error) {
            console.log(error);
        }
    };
};
export const putCustomerInfo = (userId, customerInfo, customerId, token) => {
    return dispatch => {
        try {
            setDoc(
                doc(db, 'userRessources', userId, 'customer', customerId),
                customerInfo,
            );
            const newCustomerInfo = {
                customerType: customerInfo.customerType,
                userName: customerInfo.userName,
                familyName: customerInfo.familyName,
                companyName: customerInfo.companyName,
                adressStreet: customerInfo.adressStreet,
                adressLineTwo: customerInfo.adressLineTwo,
                adressCity: customerInfo.adressCity,
                deliveryAdressStreet: customerInfo.deliveryAdressStreet,
                deliveryAdressLineTwo: customerInfo.deliveryAdressLineTwo,
                deliveryAdressCity: customerInfo.deliveryAdressCity,
                mail: customerInfo.mail,
                phone: customerInfo.phone,
                siret: customerInfo.siret,
                tvaNumber: customerInfo.tvaNumber,
                customerDetails: customerInfo.customerDetails,
            };
            const idCustomer = {
                id: customerId + 1,
            };

            const updatedCustomer = Object.assign(newCustomerInfo, idCustomer);

            dispatch({ type: PUT_CUSTOMER_INFO, customerInfo: updatedCustomer });
        } catch (error) {
            console.log(error);
        }
    };
};
export const deleteCustomer = (userId, customerId, token) => {
    return dispatch => {
        try {
            deleteDoc(doc(db, 'userRessources', userId, 'customer', customerId));

            dispatch({ type: DELETE_CUSTOMER, customerId: customerId });
        } catch (error) {
            console.log(error);
        }
    };
};
export const getCustomers = userId => {
    return async dispatch => {
        try {
            const docSnap = await getDocs(
                collection(db, 'userRessources', userId, 'customer'),
            );
            const fetchedCustomers = [];

            docSnap.forEach(doc => {
                const idCustomer = {
                    id: doc.id,
                };
                const customerInfo = Object.assign(idCustomer, doc.data());
                fetchedCustomers.push(customerInfo);
            }),
                dispatch({ type: GET_CUSTOMERS, customers: fetchedCustomers });
        } catch (error) {
            console.log(error);
        }
    };
};
