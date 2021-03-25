import * as actionTypes from './actionTypes'
import {signIn, signUp} from '../../axios-auth'

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

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email, 
            password: password, 
            returnSecurePassword: true
        }

        let url = (authData) => signUp.post("", authData) 
        if (!isSignUp )  {
            url = (authData) => signIn.post("", authData)
        }
        url(authData).then(response => {
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            console.log(response)
           }).catch( err => {
            dispatch(authFail(err.response.data.error))
           })
    };
    
};




   


  
 
