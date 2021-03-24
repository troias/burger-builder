import * as actionTypes from './actionTypes'
import instance from '../../axios-auth'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,

    };
};


export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

///ASYNC

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart())

    };
};