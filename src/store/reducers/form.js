import * as actionTypes from "../actions";

const initialState = {
  form: {
    name: null,
    street: null,
    zipCode: null,
    country: null,
    email: null,
    deliveryType: null
  },
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_CLICKED:
      const updatedState = Object.assign({}, state);
      updatedState.loading = true;
      return state;
    default:
      return state;
  }
};

export default reducer;
