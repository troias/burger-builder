import { updateObject } from '../../utility/utility'

export const purchaseInit= (state,action) => {

        return updateObject(state, { purchased: false })
}

export const purchaseBurgerStart = (state,action) => {

    return updateObject(state, { loading: true })
}

export const purchaseBurgerSuccess= (state,action) => {

    const newOrdr = { id: action.orderId }

    const newOrder = updateObject(action.orderData, newOrdr)

    const newOrd = {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    }

    return updateObject(state, newOrd)

}

export const purchaseBurgerFail = (state,action) => {
    return updateObject(state, { loading: false })
}

export const fetchOrdersStart= (state,action) => {

    return updateObject(state, { loading: true })
}

export const fetchOrdersSuccess= (state,action) => {

    const order_succ = {
        orders: action.orders,
        loading: false
    }

    return updateObject(state, order_succ)
}

export const fetchOrdersFail= (state,action) => {
    const order_fail = {
        ...state,
        purchased: false
    }

    return updateObject(state, order_fail)
}


       

    