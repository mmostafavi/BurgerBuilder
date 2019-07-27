import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/utility";

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
            return updateObject(state, { loading: true });

        case actionTypes.AUTH_SUCCEED:
            return updateObject(state, {
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false
            });

        case actionTypes.AUTH_FAILED:
            return updateObject(state, { error: action.error, loading: false });

        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, { token: null, userId: null });

        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return updateObject(state, { redirectPath: action.path });

        default:
            return state;
    }
};

export default reducer;
