import * as actionTypes from "../actions/actionTypes";

const intialState = {
    orders: [],
    loading: false, 
    purchased: false

};

export const orderReducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        default:
            return state

    }
    return state
}

export default orderReducer