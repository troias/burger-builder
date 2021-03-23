import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../utility/utility'

const intialState = {
    orders: [],
    loading: false,
    purchased: false

};

export const orderReducer = (state = intialState, action) => {
    switch (action.type) {

        case actionTypes.PURCHASE_INIT:

            return updateObject(state, { purchased: false })

        case actionTypes.PURCHASE_BURGER_START:

            return updateObject(state, { loading: true })

        case actionTypes.PURCHASE_BURGER_SUCCESS:

            const newOrdr = { id: action.orderId }

            const newOrder = updateObject(action.orderData, newOrdr)

            const newOrd = {
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            }

            return updateObject(state, newOrd)

        case actionTypes.PURCHASE_BURGER_FAIL:

            return updateObject(state, { loading: false })

        case actionTypes.FETCH_ORDERS_START:

            return updateObject(state, { loading: true })

        case actionTypes.FETCH_ORDERS_SUCCESS:

            const order_succ = {
                orders: action.orders,
                loading: false
            }

            return updateObject(state, order_succ)

        case actionTypes.FETCH_ORDERS_FAIL:

            const order_fail = {
                ...state,
                purchased: false
            }

            return updateObject(state, order_fail)

        default:

            return state

    }
}

export default orderReducer