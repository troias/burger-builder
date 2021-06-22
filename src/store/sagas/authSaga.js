import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga/effects'
import * as actions from '../actions/index'
import { signIn, signUp } from '../../axios-auth'

export function* logOutSaga(action) {
    
    yield call([localStorage, 'removeItem'], 'token')
    yield call([localStorage, 'removeItem'], 'expirationData')
    yield call([localStorage, 'removeItem'], 'userId')
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
     
        yield put(actions.authFail(error.response.data.error.message))
     
    }
    
    
}

export function* authCheckStateSaga(action) {
    
    const token = yield localStorage.getItem('token')
    if (!token) {
        yield put(actions.logOut())
    } else {
        const expirationTime = yield new Date(localStorage.getItem('expirationData'))
        if (expirationTime <= new Date()) {
            yield put(actions.logOut())
        } else {
            const userId = yield localStorage.getItem('userId')
            yield put(actions.authSuccess(token, userId))
            yield put(actions.checkAuthTimeOut((expirationTime.getTime() - new Date().getTime()) / 1000))
        }

    }
}

