import * as actionTypes from "../actions";

const initialState = {
  totalPrice: 4,
  ingredients: {
    salad: 0,
    bacon: 0,
    meat: 0,
    cheese: 0
  },
  unPurchasable: true
};

const GREDIENT_PRICES = {
  meat: 1.4,
  bacon: 0.9,
  salad: 0.4,
  cheese: 0.6
};

const reducer = (state = initialState, action) => {
  const updatedState = Object.assign({}, state);
  let sum = 0;

  switch (action.type) {
    case actionTypes.ING_ADDED:
      updatedState.ingredients[action.ingType] += 1;
      updatedState.totalPrice += GREDIENT_PRICES[action.ingType];

      sum = Object.keys(action.ingredients)
        .map(key => action.ingredients[key])
        .reduce((sum, el) => sum + el);

      updatedState.unPurchasable = sum === 0;

      return {
        ...updatedState
      };

    case actionTypes.ING_REMOVED:
      updatedState.ingredients[action.ingType] -= 1;
      updatedState.totalPrice -= GREDIENT_PRICES[action.ingType];

      sum = Object.keys(action.ingredients)
        .map(key => action.ingredients[key])
        .reduce((sum, el) => sum + el);

      updatedState.unPurchasable = sum === 0;

      return {
        ...updatedState
      };

    default:
      return state;
  }
};

export default reducer;
