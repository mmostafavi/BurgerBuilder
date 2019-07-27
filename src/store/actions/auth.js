import * as actionTypes from "./actionTypes";
import axios from "../../axios-auth";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSucceed = authData => {
    return {
        type: actionTypes.AUTH_SUCCEED,
        idToken: authData.idToken,
        userId: authData.localId
    };
};

export const authFailed = error => {
    return {
        type: actionTypes.AUTH_FAILED,
        error
    };
};

export const authLogout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("userId");

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const setAuthTime = expiresIn => {
    return dispatch => {
        setTimeout(dispatch(authLogout()), expiresIn * 1000);
    };
};

export const authentication = (email, pass, isSignUp) => {
    return dispatch => {
        const authData = {
            email: email,
            password: pass,
            returnSecureToken: true
        };

        let url =
            "/accounts:signInWithPassword?key=AIzaSyAbXEVsZeAlM6vM9HgMNQ1qsjK64VQyJoU";
        if (isSignUp) {
            url =
                "/accounts:signUp?key=AIzaSyAbXEVsZeAlM6vM9HgMNQ1qsjK64VQyJoU";
        }

        dispatch(authStart());
        axios
            .post(url, authData)
            .then(res => {
                const expiraionDate = new Date(
                    new Date().getTime() + res.data.expiresIn * 1000
                );

                localStorage.setItem("idToken", res.data.idToken);
                localStorage.setItem("expirationDate", expiraionDate);
                localStorage.setItem("userId", res.data.localId);
                setAuthTime(res.data.expiresIn);
                dispatch(authSucceed(res.data));
            })
            .catch(error => {
                dispatch(authFailed(error));
            });
    };
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const checkAuth = () => {
    return dispatch => {
        const token = localStorage.getItem("idToken");
        if (!token) {
            // dispatch(authLogout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );

            if (expirationDate > new Date()) {
                setAuthTime(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                );
                const userId = localStorage.getItem("userId");
                dispatch(authSucceed({ idToken: token, localId: userId }));
            } else {
                // dispatch(authLogout());
            }
        }
    };
};
