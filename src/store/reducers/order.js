import * as actionTypes from "../actions/actionTypes";

const initialState = {
    form: {
        name: null,
        street: null,
        zipCode: null,
        country: null,
        email: null,
        deliveryType: null
    },
    results: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false
            };
        case actionTypes.PURCHASE_BURGER_SUCCEED:
            return {
                ...state,
                purchased: true
            };
        case actionTypes.PURCHASE_BURGER_INIT:
            return {
                ...state,
                purchased: false
            };
        case actionTypes.FETCH_ORDERS_INIT:
            return {
                ...state,
                loading: true
            };

        case actionTypes.FETCH_ORDERS_SUCCEED:
            return {
                ...state,
                loading: false,
                results: action.orders
            };
        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;
