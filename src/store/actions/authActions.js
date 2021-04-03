import * as actionTypes from './actionTypes'
import { signIn, signUp } from '../../axios-auth'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,

    };
};


export const authSuccess = (token, userId) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId

    };
};


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

///ASYNC

export const logOut = () => {

    // localStorage.removeItem('token')
    // localStorage.removeItem('expirationData')
    // localStorage.removeItem('userId')

    return {
        type: actionTypes.AUTH_INIT_LOGOUT,
    }
}
export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut())
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())



        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = (authData) => signUp.post("", authData)
        if (!isSignUp) {
            url = (authData) => signIn.post("", authData)
        }

        url(authData).then(response => {

            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)

            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('expirationData', expirationDate)
            localStorage.setItem('userId', response.data.localId)

            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeOut(response.data.expiresIn))
          
        }).catch(err => {
            dispatch(authFail(err.response.data.error))
        })
    };

};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logOut())
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationData'))
            if (expirationTime <= new Date()) {
                dispatch(logOut())
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeOut((expirationTime.getTime() - new Date().getTime()) / 1000))
            }

        }
    }
}








