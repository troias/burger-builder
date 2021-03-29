import * as actionTypes from './actionTypes'
import instance from "../../axios-orders";

//SYNC

const setOrder = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

//OnError

const setError = (err) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
    };
};

//ON START 

export const onPurchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};



//ASYNC

export const purchaseBurgerSuccess = (orderData, token) => {
    return (dispatch) => {
        dispatch(onPurchaseStart())
        instance.post("/orders.json?auth=" + token, orderData).then((res) => {
            dispatch(setOrder(res.data.name, orderData));
        })
            .catch((err) => {
                dispatch(setError(err));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

//Order_Actions


//SYNC

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrdersSuccess = (orders) => {
   console.log('Orders' + orders)
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

//ERROR

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

///ASYNC

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo"' + userId + '"'
        instance.get("/orders.json" + queryParams ).then((res) => {
            let fetchedOrders = []
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        }).catch((err) => {
            dispatch(fetchOrdersFail(err));
        });
    }
}




