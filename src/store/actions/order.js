import * as actionTypes from './actionTypes'
import instance from "../../axios-orders";




//PURCHASE_RELATED_ACTIONS

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const onPurchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};


export const purchaseBurgerSuccess = (orderData, token) => {
  return {
      type: actionTypes.PURCHASE_BURGER_SUCCESS_INIT,
      token: token,
      orderData: orderData
  }
};

//Order_Related_ Actions

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrdersSuccess = (orders) => {

    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const setOrder = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

///ASYNC

export const fetchOrders = (token, userId) => {

    return {
        type: actionTypes.FETCH_ORDERS_INIT,
        token: token, 
        userId: userId
    }
}

//ERRORs

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}


export const purchaseBurgerFail = (err) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
    };
};






