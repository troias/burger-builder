import * as actionTypes from "./actionTypes";
import instance from "../../axios-orders";

//ASYNC SET FUNCTION

export const addInitialIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS
  }
};

//SET INITIAL INGREDIENTS

export const setIngredient = (ingName) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredientName: ingName,
  };
};


//ADD INGREDIENTS

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