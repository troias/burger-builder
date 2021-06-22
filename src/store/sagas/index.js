import { takeEvery, all, takeLatest } from 'redux-saga/effects'

import {
    logOutSaga,
    checkAuthTimeOutSaga,
    authUserSaga,
    authCheckStateSaga,
} from '../sagas/authSaga'

import {
    addInitialIngredientsSaga
} from '../sagas/burgerBuilderSaga'

import {
    purchaseBurgerSuccessSaga, 
    fetchOrdersSaga
} from '../sagas/ordersSaga'

import * as actionTypes from '../actions/actionTypes'


export function* watchAuth() {

    yield all([
         takeEvery(actionTypes.AUTH_INIT_LOGOUT, logOutSaga),
         takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeOutSaga),
         takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_USER_CHECK_STATE, authCheckStateSaga),
    ])
  

}
export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, addInitialIngredientsSaga)
}
export function* watchOrders() {

    yield takeLatest(actionTypes.PURCHASE_BURGER_SUCCESS_INIT, purchaseBurgerSuccessSaga)
    yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga)

}