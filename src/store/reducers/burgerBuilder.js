import * as actionTypes from "../actions/actionTypes";

const initialState = {
    totalPrice: 4,
    ingredients: null,
    unPurchasable: true,
    error: false,
    building: false
};

const GREDIENT_PRICES = {
    meat: 1.4,
    bacon: 0.9,
    salad: 0.4,
    cheese: 0.6
};

const reducer = (state = initialState, action) => {
    let sum = 0;
    const updatedIngredients = { ...state.ingredients };
    let updatedPrice = state.totalPrice;
    let updatedUnPurchasable = state.unPurchasable;

    switch (action.type) {
        case actionTypes.ING_ADDED:
            updatedIngredients[action.ingType] += 1;
            updatedPrice += GREDIENT_PRICES[action.ingType];

            sum = Object.keys(updatedIngredients)
                .map(key => updatedIngredients[key])
                .reduce((sum, el) => sum + el);

            updatedUnPurchasable = sum === 0;

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: updatedIngredients[action.ingType]
                },
                totalPrice: updatedPrice,
                unPurchasable: updatedUnPurchasable,
                building: true
            };

        case actionTypes.ING_REMOVED:
            updatedIngredients[action.ingType] -= 1;
            updatedPrice -= GREDIENT_PRICES[action.ingType];

            sum = Object.keys(updatedIngredients)
                .map(key => updatedIngredients[key])
                .reduce((sum, el) => sum + el);

            updatedUnPurchasable = sum === 0;

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: updatedIngredients[action.ingType]
                },
                totalPrice: updatedPrice,
                unPurchasable: updatedUnPurchasable,
                building: true
            };

        case actionTypes.INIT_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...action.ingredients
                },
                unPurchasable: true,
                totalPrice: 4
            };

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };

        default:
            return state;
    }
};

export default reducer;
