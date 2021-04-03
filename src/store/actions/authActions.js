import * as actionTypes from './actionTypes'


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
    return {
        type: actionTypes.AUTH_INIT_LOGOUT,
    }
}

export const logOutSucceed = () => {
    return {
        type: actionTypes.LOG_OUT,
    }
}

export const checkAuthTimeOut = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
   
}

export const auth = (email, password, isSignUp) => {
    return  {
       type: actionTypes.AUTH_USER, 
       email: email, 
       password: password, 
       isSignUp: isSignUp
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








