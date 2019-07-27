import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/utility";

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
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { loading: true });

        case actionTypes.PURCHASE_BURGER_FAILED:
            return updateObject(state, { loading: false });

        case actionTypes.PURCHASE_BURGER_SUCCEED:
            return updateObject(state, { loading: false, purchased: true });

        case actionTypes.PURCHASE_BURGER_INIT:
            return updateObject(state, { purchased: false, loading: false });

        case actionTypes.FETCH_ORDERS_INIT:
            return updateObject(state, { loading: true });

        case actionTypes.FETCH_ORDERS_SUCCEED:
            return updateObject(state, {
                loading: false,
                results: action.orders
            });

        case actionTypes.FETCH_ORDERS_FAILED:
            return updateObject(state, { loading: false });

        default:
            return state;
    }
};

export default reducer;
