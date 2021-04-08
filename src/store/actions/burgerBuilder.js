import * as actionTypes from "./actionTypes";

// INGREDIENTS FUNCTIONS

export const addInitialIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS
  }
};

export const setIngredient = (ingName) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredientName: ingName,
  };
};

const saveIngredient = (ingName) => {
     return {
       type: actionTypes.ADD_INGREDIENTS,
       ingredientName: ingName,
     };
   };

export const addIngredients = (ingName) => {
  return (dispatch) => {
    dispatch(saveIngredient(ingName));
  };
};

export const removeIngredients = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName: ingName,
  };
};

//ERROR

export const setError = () => {
  return {
    type: actionTypes.SET_ERROR_FAILED,
  };
};