import * as actionTypes from "../actions/actionTypes";
import * as utilityFunctions from './utilityFunctions/BurgerBuilderUtilityFunctions'

const intialState = {

  }

  const reducer = (state = intialState, action) => {

    switch (action.type) {
  
      case actionTypes.AUTH_START: return utilityFunctions.addIngredients(state, action)
      case actionTypes.AUTH_SUCCESS: return utilityFunctions.removeIngredients(state, action)
      case actionTypes.AUTH_FAIL: return utilityFunctions.setIngredients(state, action)

    }
    return state;
  };
  
  export default reducer;
  