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

const initialState = {
    userInfo: [],
    customers: [],
    customerInfo: [],
    productInfo: [],
    products: [],
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
                customers: [actualCustomers],
            };
        case DELETE_PRODUCT:
            let actualProducts = [...state.products];
            actualProducts = actualProducts.filter(
                product => product.id != action.productId,
            );
            return {
                ...state,
                products: [actualProducts],
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
        default:
            return state;
    }
};
