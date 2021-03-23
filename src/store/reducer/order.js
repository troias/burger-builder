import * as actionTypes from "../actions/actionTypes";
import * as utilityFunctions from './utilityFunctions/OrderReducerUtilityFunction'

const intialState = {
    orders: [],
    loading: false,
    purchased: false

};

export const orderReducer = (state = intialState, action) => {
    switch (action.type) {

        case actionTypes.PURCHASE_INIT: utilityFunctions.purchaseInit(state, action)
        case actionTypes.PURCHASE_BURGER_START: utilityFunctions.purchaseBurgerStart(state, action)
        case actionTypes.PURCHASE_BURGER_SUCCESS: utilityFunctions.purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL: utilityFunctions.purchaseBurgerFail(state, action)
        case actionTypes.FETCH_ORDERS_START: utilityFunctions.fetchOrdersStart(state, action)
        case actionTypes.FETCH_ORDERS_SUCCESS: utilityFunctions.fetchOrdersSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL: utilityFunctions.fetchOrdersFail(state, action)
        
        default:
            return state

    }
}

export default orderReducer