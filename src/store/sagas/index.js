import { takeEvery } from 'redux-saga/effects'

import {
    logOutSaga, 
    checkAuthTimeOutSaga, 
    authUserSaga} from '../sagas/authSaga'

import * as actionTypes from '../actions/actionTypes'


export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logOutSaga )
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeOutSaga )
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga )
}