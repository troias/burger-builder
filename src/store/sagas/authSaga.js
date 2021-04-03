import { put } from 'redux-saga/effects'
import { delay } from 'redux-saga/effects'
import * as actions from '../actions/index'
import { signIn, signUp } from '../../axios-auth'

export function* logOutSaga(action) {
    yield localStorage.removeItem('token')
    yield localStorage.removeItem('expirationData')
    yield localStorage.removeItem('userId')
    yield put(actions.logOutSucceed())
}


export function* checkAuthTimeOutSaga(action) {
    yield delay(action.expirationTime * 1000)
    yield put(actions.logOut())
}

export function* authUserSaga(action) {
    yield put(actions.authStart())
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = (authData) => signUp.post("", authData)
    if (!action.isSignUp) {
        url = (authData) => signIn.post("", authData)
    }
    try {
        const resp = yield url(authData)
        const expirationDate = new Date(new Date().getTime() + resp.data.expiresIn * 1000)
        yield localStorage.setItem('token', resp.data.idToken)
        yield localStorage.setItem('expirationData', expirationDate)
        yield localStorage.setItem('userId', resp.data.localId)
        yield put(actions.authSuccess(resp.data.idToken, resp.data.localId))
        yield put(actions.checkAuthTimeOut(resp.data.expiresIn))
    } catch (error) {
        yield put(actions.authFail(error.res.data.error))
    }
    
}











// dispatch(authStart())
// const authData = {
//     email: email,
//     password: password,
//     returnSecureToken: true
// }

// let url = (authData) => signUp.post("", authData)
// if (!isSignUp) {
//     url = (authData) => signIn.post("", authData)
// }

// url(authData).then(response => {

//     const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)

//     localStorage.setItem('token', response.data.idToken)
//     localStorage.setItem('expirationData', expirationDate)
//     localStorage.setItem('userId', response.data.localId)

//     dispatch(authSuccess(response.data.idToken, response.data.localId))
//     dispatch(checkAuthTimeOut(response.data.expiresIn))

// }).catch(err => {
//     dispatch(authFail(err.response.data.error))
// })