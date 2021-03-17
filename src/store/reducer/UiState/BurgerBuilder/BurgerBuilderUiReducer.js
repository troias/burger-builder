import * as actionTypes from '../../../actions/actions'

let intialState = {
    purchasing: false,
    loading: false,
    error: false
}


const reducer = (state = intialState, action) => {

    switch (action.type) {
        case actionTypes.PURCHASEABLE:
            const newState = {
                ...state,
                purchasing: false
            }
            return newState > 0
    }


    return state
}



export default reducer

