import { updateObject } from '../../utility/utility'

export const addIngredients = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedStateAdd = {
      ingredients: updatedIngredients,
      totalPrice: state.totalPrice + state.ingredient_prices[action.ingredientName],
      building: true
    }
    return updateObject(state, updatedStateAdd);
  }
  
 export const removeIngredients = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject(state.ingredients, updatedIng)
    const updatedStateRed = {
      ingredients: updatedIngs,
      totalPrice: state.totalPrice + state.ingredient_prices[action.ingredientName],
    }
    return updateObject(state, updatedStateRed);
  }
  
 export const setIngredients = (state, action) => {
    const set_ings = {
      ingredients: {
        salad: action.ingredientName.salad,
        bacon: action.ingredientName.bacon,
        cheese: action.ingredientName.cheese,
        meat: action.ingredientName.meat,
      },
      totalPrice: 4,
      error: false, 
      building: false
    };
    return updateObject(state, set_ings)
  
  }
  
 export const setErrorFailed = (state, action) => {
    return updateObject(state, { error: true })
  }