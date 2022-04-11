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

export const ADD_PRODUCT_INFO = 'ADD_PRODUCT_INFO';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const PUT_PRODUCT_INFO = 'PUT_PRODUCT_INFO';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const addProductInfo = (userId, productInfo, token) => {
    return dispatch => {
        try {
            addDoc(collection(db, 'userRessources', userId, 'product'), productInfo);
            const newProductInfo = {
                productType: productInfo.productType,
                name: productInfo.name,
                description: productInfo.description,
                isTaxesFree: productInfo.isTaxesFree,
                priceWithTaxesTvaFree: productInfo.priceWithTaxesTvaFree,
                priceWithoutTaxes: productInfo.priceWithoutTaxes,
                tva: productInfo.tva,
                priceTtc: productInfo.priceTtc,
                unit: productInfo.unit,
                information: productInfo.information,
            };

            dispatch({ type: ADD_PRODUCT_INFO, productInfo: newProductInfo });
        } catch (error) {
            console.log(error);
        }
    };
};
export const putProductInfo = (userId, productInfo, productId, token) => {
    return dispatch => {
        try {
            setDoc(doc(db, 'userRessources', userId, 'product', productId), productInfo);
            const newProductInfo = {
                productType: productInfo.productType,
                name: productInfo.name,
                description: productInfo.description,
                isTaxesFree: productInfo.isTaxesFree,
                priceWithTaxesTvaFree: productInfo.priceWithTaxesTvaFree,
                priceWithoutTaxes: productInfo.priceWithoutTaxes,
                tva: productInfo.tva,
                priceTtc: productInfo.priceTtc,
                unit: productInfo.unit,
                information: productInfo.information,
            };
            const idProduct = {
                id: productId + 1,
            };

            const updatedProduct = Object.assign(newProductInfo, idProduct);

            dispatch({ type: PUT_PRODUCT_INFO, productInfo: updatedProduct });
        } catch (error) {
            console.log(error);
        }
    };
};
export const deleteProduct = (userId, productId, token) => {
    return dispatch => {
        try {
            deleteDoc(doc(db, 'userRessources', userId, 'product', productId));

            dispatch({ type: DELETE_PRODUCT, productId: productId });
        } catch (error) {
            console.log(error);
        }
    };
};
export const getProducts = userId => {
    return async dispatch => {
        try {
            const docSnap = await getDocs(
                collection(db, 'userRessources', userId, 'product'),
            );
            const fetchedProducts = [];

            docSnap.forEach(doc => {
                const idProduct = {
                    id: doc.id,
                };
                const productInfo = Object.assign(idProduct, doc.data());
                fetchedProducts.push(productInfo);
            }),
                dispatch({ type: GET_PRODUCTS, products: fetchedProducts });
        } catch (error) {
            console.log(error);
        }
    };
};
