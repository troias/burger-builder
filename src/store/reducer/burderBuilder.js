import * as actionTypes from "../actions/actionTypes";
import * as utilityFunctions from './utilityFunctions/BurgerBuilderUtilityFunctions'

const intialState = {

  ingredients: null,
  totalPrice: 0,
  error: false,
  building: false, 
  
  ingredient_prices: {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
  }
  
}

const reducer = (state = intialState, action) => {

  switch (action.type) {

    case actionTypes.ADD_INGREDIENTS: return utilityFunctions.addIngredients(state, action)
    case actionTypes.REMOVE_INGREDIENTS: return utilityFunctions.removeIngredients(state, action)
    case actionTypes.SET_INGREDIENTS: return utilityFunctions.setIngredients(state, action)
    case actionTypes.SET_ERROR_FAILED: return utilityFunctions.setErrorFailed(state, action)
    
  }
  return state;
};

export default reducer;
