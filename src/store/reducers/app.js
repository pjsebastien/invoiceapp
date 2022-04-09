import { ADD_USER_INFO, GET_USER_INFO } from '../actions/userInfo';
import {
    ADD_CUSTOMER_INFO,
    GET_CUSTOMERS,
    PUT_CUSTOMER_INFO,
    DELETE_CUSTOMER,
} from '../actions/customerInfo';

const initialState = {
    userInfo: [],
    customers: [],
    customerInfo: [],
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
        case PUT_CUSTOMER_INFO:
            return {
                ...state,
                customers: [action.customerInfo, ...state.customers],
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
        default:
            return state;
    }
};
