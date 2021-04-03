import { takeEvery } from 'redux-saga/effects'

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

    yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logOutSaga)
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeOutSaga)
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga)
    yield takeEvery(actionTypes.AUTH_USER_CHECK_STATE, authCheckStateSaga)

}
export function* watchBurgerBuilder() {

    yield takeEvery(actionTypes.INIT_INGREDIENTS, addInitialIngredientsSaga)
}
export function* watchOrders() {

    yield takeEvery(actionTypes.PURCHASE_BURGER_SUCCESS_INIT, purchaseBurgerSuccessSaga)
    yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga)

}