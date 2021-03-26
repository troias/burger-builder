import * as actionTypes from "../actions/actionTypes";
import * as utilityFunctions from './utilityFunctions/OrderReducerUtilityFunction'

const intialState = {
    orders: [],
    loading: false,
    purchased: false

};

export const orderReducer = (state = intialState, action) => {
    switch (action.type) {

        case actionTypes.PURCHASE_INIT: return utilityFunctions.purchaseInit(state, action)
        case actionTypes.PURCHASE_BURGER_START: return utilityFunctions.purchaseBurgerStart(state, action)
        case actionTypes.PURCHASE_BURGER_SUCCESS: return utilityFunctions.purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL: return utilityFunctions.purchaseBurgerFail(state, action)
        case actionTypes.FETCH_ORDERS_START: return utilityFunctions.fetchOrdersStart(state, action)
        case actionTypes.FETCH_ORDERS_SUCCESS: return utilityFunctions.fetchOrdersSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL: return utilityFunctions.fetchOrdersFail(state, action)
        
        default:
            return state

    }
}

export default orderReducer