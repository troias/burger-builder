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

export const purchaseBurgerSuccess = (orderData) => {
    return (dispatch) => {
        dispatch(onPurchaseStart())
        instance.post("/orders.json", orderData).then((res) => {
            console.log(res.data)
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