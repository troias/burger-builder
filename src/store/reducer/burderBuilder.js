import * as actionTypes from '../actions/actionTypes'

const intialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0,
    },

    totalPrice: 0, 
}

const ingredient_prices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

const reducer = (state = intialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            const newState = {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1, 

                }, 
                totalPrice: state.totalPrice + ingredient_prices[action.ingredientName], 

            }
            return newState
        case actionTypes.REMOVE_INGREDIENTS:
            const removeIng = {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1, 

                }, 
                totalPrice: state.totalPrice - ingredient_prices[action.ingredientName]
            }
            return removeIng;
          
      
    }
    return state
}


export default reducer