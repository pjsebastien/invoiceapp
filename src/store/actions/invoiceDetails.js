import { doc, setDoc, getDocs, addDoc, collection, deleteDoc } from 'firebase/firestore';
import { db } from '../../db/firebase';

export const ADD_PAYMENT_MODE = 'ADD_PAYMENT_MODE';
export const GET_PAYMENT_MODE = 'GET_PAYMENT_MODE';
// export const PUT_PRODUCT_INFO = 'PUT_PRODUCT_INFO';
export const DELETE_PAYMENT_MODE = 'DELETE_PAYMENT_MODE';

export const ADD_TERMS_AND_CONDITIONS = 'ADD_TERMS_AND_CONDITIONS';
export const GET_TERMS_AND_CONDITIONS = 'GET_TERMS_AND_CONDITIONS';
// export const PUT_PRODUCT_INFO = 'PUT_PRODUCT_INFO';
export const DELETE_TERMS_AND_CONDITIONS = 'DELETE_TERMS_AND_CONDITIONS';

export const addPaymentMode = (userId, paymentMode, token) => {
    return dispatch => {
        try {
            addDoc(collection(db, 'userRessources', userId, 'paymentMode'), paymentMode);
            const newPaymentMode = {
                name: paymentMode.name,
            };

            dispatch({ type: ADD_PAYMENT_MODE, paymentMode: newPaymentMode });
        } catch (error) {
            console.log(error);
        }
    };
};
// export const putProductInfo = (userId, productInfo, productId, token) => {
//     return dispatch => {
//         try {
//             setDoc(doc(db, 'userRessources', userId, 'product', productId), productInfo);
//             const newProductInfo = {
//                 productType: productInfo.productType,
//                 name: productInfo.name,
//                 description: productInfo.description,
//                 isTaxesFree: productInfo.isTaxesFree,
//                 priceWithTaxesTvaFree: productInfo.priceWithTaxesTvaFree,
//                 priceWithoutTaxes: productInfo.priceWithoutTaxes,
//                 tva: productInfo.tva,
//                 priceTtc: productInfo.priceTtc,
//                 unit: productInfo.unit,
//                 information: productInfo.information,
//                 quantity: productInfo.quantity,
//             };
//             const idProduct = {
//                 id: productId + 1,
//             };

//             const updatedProduct = Object.assign(newProductInfo, idProduct);

//             dispatch({ type: PUT_PRODUCT_INFO, productInfo: updatedProduct });
//         } catch (error) {
//             console.log(error);
//         }
//     };
// };
export const deletePaymentMode = (userId, paymentModeId, token) => {
    return dispatch => {
        try {
            deleteDoc(doc(db, 'userRessources', userId, 'paymentMode', paymentModeId));

            dispatch({ type: DELETE_PAYMENT_MODE, paymentModeId: paymentModeId });
        } catch (error) {
            console.log(error);
        }
    };
};
export const getPaymentMode = userId => {
    return async dispatch => {
        try {
            const docSnap = await getDocs(
                collection(db, 'userRessources', userId, 'paymentMode'),
            );
            const fetchedPaymentMode = [];

            docSnap.forEach(doc => {
                const idPaymentMode = {
                    id: doc.id,
                };
                const paymentModeInfo = Object.assign(idPaymentMode, doc.data());
                fetchedPaymentMode.push(paymentModeInfo);
            }),
                dispatch({ type: GET_PAYMENT_MODE, paymentMode: fetchedPaymentMode });
        } catch (error) {
            console.log(error);
        }
    };
};

export const addTermsAndConditions = (userId, termsAndConditions, token) => {
    return dispatch => {
        try {
            addDoc(
                collection(db, 'userRessources', userId, 'termsAndConditions'),
                termsAndConditions,
            );
            const newTermsAndConditions = {
                name: termsAndConditions.name,
            };

            dispatch({
                type: ADD_TERMS_AND_CONDITIONS,
                termsAndConditions: newTermsAndConditions,
            });
        } catch (error) {
            console.log(error);
        }
    };
};
// export const putProductInfo = (userId, productInfo, productId, token) => {
//     return dispatch => {
//         try {
//             setDoc(doc(db, 'userRessources', userId, 'product', productId), productInfo);
//             const newProductInfo = {
//                 productType: productInfo.productType,
//                 name: productInfo.name,
//                 description: productInfo.description,
//                 isTaxesFree: productInfo.isTaxesFree,
//                 priceWithTaxesTvaFree: productInfo.priceWithTaxesTvaFree,
//                 priceWithoutTaxes: productInfo.priceWithoutTaxes,
//                 tva: productInfo.tva,
//                 priceTtc: productInfo.priceTtc,
//                 unit: productInfo.unit,
//                 information: productInfo.information,
//                 quantity: productInfo.quantity,
//             };
//             const idProduct = {
//                 id: productId + 1,
//             };

//             const updatedProduct = Object.assign(newProductInfo, idProduct);

//             dispatch({ type: PUT_PRODUCT_INFO, productInfo: updatedProduct });
//         } catch (error) {
//             console.log(error);
//         }
//     };
// };
export const deleteTermsAndConditions = (userId, termsAndConditionsId, token) => {
    return dispatch => {
        try {
            deleteDoc(
                doc(
                    db,
                    'userRessources',
                    userId,
                    'termsAndConditions',
                    termsAndConditionsId,
                ),
            );

            dispatch({
                type: DELETE_TERMS_AND_CONDITIONS,
                termsAndConditionsId: termsAndConditionsId,
            });
        } catch (error) {
            console.log(error);
        }
    };
};
export const getTermsAndConditions = userId => {
    return async dispatch => {
        try {
            const docSnap = await getDocs(
                collection(db, 'userRessources', userId, 'termsAndConditions'),
            );
            const fetchedTermsAndConditions = [];

            docSnap.forEach(doc => {
                const idTermsAndConditions = {
                    id: doc.id,
                };
                const termsAndConditionsInfo = Object.assign(
                    idTermsAndConditions,
                    doc.data(),
                );
                fetchedTermsAndConditions.push(termsAndConditionsInfo);
            }),
                dispatch({
                    type: GET_TERMS_AND_CONDITIONS,
                    termsAndConditions: fetchedTermsAndConditions,
                });
        } catch (error) {
            console.log(error);
        }
    };
};
