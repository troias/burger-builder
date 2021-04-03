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
    return {
        type: actionTypes.AUTH_USER_CHECK_STATE
    }
}








