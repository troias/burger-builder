import { put } from 'redux-saga/effects'
import instance from '../../axios-orders'
import * as actions from '../actions/index'

//PURCHASING

export function* purchaseBurgerSuccessSaga(action) {
    yield put(actions.onPurchaseStart())
    try {
        const req = yield instance.post("/orders.json?auth=" + action.token, action.orderData)
        yield put(actions.setOrder(req.data.name, action.orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

//FETCHING
export function* fetchOrdersSaga(action) {

    yield put(actions.fetchOrdersStart())
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo"' + action.userId + '"'
    try {
        const req = yield instance.get('orders.json' + queryParams)
        let fetchedOrders = []
        for (let orderNames in req.data) {
            fetchedOrders.push({
                ...req.data[orderNames],
                id: orderNames
            })
            yield put(actions.fetchOrdersSuccess(fetchedOrders))

        }
    } catch (err) {
        yield put(actions.fetchOrdersFail(err));
    }

}