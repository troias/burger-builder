import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../utility/utility'

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
      const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
      const updatedStateAdd = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + ingredient_prices[action.ingredientName],
      }
      return updateObject(state, updatedStateAdd);

    case actionTypes.REMOVE_INGREDIENTS:
      const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
      const updatedIngs = updateObject(state.ingredients, updatedIng)
      const updatedStateRed = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + ingredient_prices[action.ingredientName],
      }
      return updateObject(state, updatedStateRed);

    case actionTypes.SET_INGREDIENTS:
      const set_ings = {
        ingredients: {
          salad: action.ingredientName.salad,
          bacon: action.ingredientName.bacon,
          cheese: action.ingredientName.cheese,
          meat: action.ingredientName.meat,
        },
        totalPrice: 4,
        error: false


      };
      return updateObject(state, set_ings)

    case actionTypes.SET_ERROR_FAILED:
      return updateObject(state, { error: true })

  }
  return state;
};

export default reducer;
