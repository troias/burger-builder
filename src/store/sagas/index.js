import { takeEvery } from 'redux-saga/effects'

import {logOutSaga} from '../sagas/authSaga'

import * as actionTypes from '../actions/actionTypes'


export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logOutSaga )
}