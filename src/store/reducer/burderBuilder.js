import * as actionTypes from "../actions/actionTypes";

const intialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
};

const ingredient_prices = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

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
      };
      return newState;
    case actionTypes.REMOVE_INGREDIENTS:
      const removeIng = {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - ingredient_prices[action.ingredientName],
      };
      return removeIng;

      case actionTypes.SET_INGREDIENTS:
        return {
            ...state, 
            ingredients: {
              salad: action.ingredientName.salad,
              bacon: action.ingredientName.bacon,
              cheese: action.ingredientName.cheese,
              meat: action.ingredientName.meat,
            }, 
            error: false

           
        };
        
        case actionTypes.SET_ERROR_FAILED:
            return {
                ...state,
                error: true
            }
  }
  return state;
};

export default reducer;
