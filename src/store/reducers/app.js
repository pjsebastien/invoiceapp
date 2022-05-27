import { ADD_USER_INFO, GET_USER_INFO } from '../actions/userInfo';
import {
    ADD_CUSTOMER_INFO,
    GET_CUSTOMERS,
    PUT_CUSTOMER_INFO,
    DELETE_CUSTOMER,
} from '../actions/customerInfo';
import {
    ADD_PRODUCT_INFO,
    GET_PRODUCTS,
    DELETE_PRODUCT,
    PUT_PRODUCT_INFO,
} from '../actions/productInfo';
import {
    ADD_PAYMENT_MODE,
    GET_PAYMENT_MODE,
    DELETE_PAYMENT_MODE,
    ADD_TERMS_AND_CONDITIONS,
    GET_TERMS_AND_CONDITIONS,
    DELETE_TERMS_AND_CONDITIONS,
} from '../actions/invoiceDetails';

const initialState = {
    userInfo: [],
    customers: [],
    customerInfo: [],
    productInfo: [],
    products: [],
    paymentMode: [],
    termsAndConditions: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo,
            };
        case ADD_CUSTOMER_INFO:
            return {
                ...state,
                customerInfo: action.customerInfo,
            };
        case ADD_PRODUCT_INFO:
            return {
                ...state,
                productInfo: action.productInfo,
            };
        case PUT_CUSTOMER_INFO:
            return {
                ...state,
                customers: [action.customerInfo, ...state.customers],
            };
        case PUT_PRODUCT_INFO:
            return {
                ...state,
                products: [action.productInfo, ...state.products],
            };
        case DELETE_CUSTOMER:
            let actualCustomers = [...state.customers];
            actualCustomers = actualCustomers.filter(
                customer => customer.id != action.customerId,
            );
            return {
                ...state,
                customers: [...actualCustomers],
            };
        case DELETE_PRODUCT:
            let actualProducts = [...state.products];
            actualProducts = actualProducts.filter(
                product => product.id != action.productId,
            );
            return {
                ...state,
                products: [...actualProducts],
            };
        case GET_USER_INFO:
            const fetchedUserInfo = action.userInfos;
            return {
                ...state,
                userInfo: fetchedUserInfo,
            };
        case GET_CUSTOMERS:
            const fetchedCustomers = action.customers;
            return {
                ...state,
                customers: fetchedCustomers,
            };
        case GET_PRODUCTS:
            const fetchedProducts = action.products;
            return {
                ...state,
                products: fetchedProducts,
            };
        case ADD_PAYMENT_MODE:
            return {
                ...state,
                paymentMode: action.paymentMode,
            };
        case GET_PAYMENT_MODE:
            const fetchedPaymentMode = action.paymentMode;
            return {
                ...state,
                paymentMode: fetchedPaymentMode,
            };
        case DELETE_PAYMENT_MODE:
            let actualPaymentMode = [...state.paymentMode];
            actualPaymentMode = actualPaymentMode.filter(
                payment => payment.id != action.paymentModeId,
            );
            return {
                ...state,
                paymentMode: [...actualPaymentMode],
            };
        case ADD_TERMS_AND_CONDITIONS:
            return {
                ...state,
                termsAndConditions: action.termsAndConditions,
            };
        case GET_TERMS_AND_CONDITIONS:
            const fetchedTermsAndConditions = action.termsAndConditions;
            return {
                ...state,
                termsAndConditions: fetchedTermsAndConditions,
            };
        case DELETE_TERMS_AND_CONDITIONS:
            let actualTermsAndConditions = [...state.termsAndConditions];
            actualTermsAndConditions = actualTermsAndConditions.filter(
                termsAndConditions => termsAndConditions.id != action.termsAndConditions,
            );
            return {
                ...state,
                termsAndConditions: [...actualTermsAndConditions],
            };
        default:
            return state;
    }
};
