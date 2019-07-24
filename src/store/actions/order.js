import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerFailed = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED
    };
};

export const purchaseBurgerSucceed = (order, id) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCEED,
        order,
        id
    };
};

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    };
};

export const orderSubmited = (formInfo, ings, price) => {
    return dispatch => {
        const formIndentifiers = {};

        for (let key in formInfo) {
            formIndentifiers[key] = formInfo[key].value;
        }

        const order = {
            ingredients: ings,
            price,
            orderInfo: {
                ...formIndentifiers
            }
        };

        axios
            .post("/orders.json", order)
            .then(response => {
                // console.log(response);
                dispatch(purchaseBurgerSucceed(order, response.data.name));
                dispatch({
                    type: actionTypes.INIT_INGREDIENTS
                });
            })
            .catch(error => {
                console.log(error);
                dispatch(purchaseBurgerFailed());
            });

        return null;
    };
};

export const fetchOrdersFailed = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED
    };
};

export const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    };
};

export const fetchOrdersSucceed = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCEED,
        orders
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersInit());
        axios
            .get("/orders.json")
            .then(res => {
                const ordersArray = Object.keys(res.data).map(key => {
                    return {
                        id: key,
                        price: res.data[key].price,
                        ingredients: res.data[key].ingredients
                    };
                });

                dispatch(fetchOrdersSucceed(ordersArray));
            })
            .catch(error => {
                dispatch(fetchOrdersFailed());
            });
    };
};
