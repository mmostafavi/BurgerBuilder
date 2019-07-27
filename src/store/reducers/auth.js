import * as actionTypes from "../actions/actionTypes";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    redirectPath: "/"
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.AUTH_SUCCEED:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false
            };

        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };

        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            };

        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                redirectPath: action.path
            };

        default:
            return state;
    }
};

export default reducer;
