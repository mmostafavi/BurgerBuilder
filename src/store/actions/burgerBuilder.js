import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const ingAdded = (type, ingredients) => {
    return {
        type: actionTypes.ING_ADDED,
        ingType: type,
        ingredients
    };
};

export const ingRemoved = (type, ingredients) => {
    return {
        type: actionTypes.ING_REMOVED,
        ingType: type,
        ingredients
    };
};

const setIngredients = ingredients => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
        ingredients
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios
            .get("/ingredients.json")
            .then(res => {
                dispatch(setIngredients(res.data));
            })
            .catch(error => {
                dispatch({ type: actionTypes.FETCH_INGREDIENTS_FAILED });
            });
    };
};
