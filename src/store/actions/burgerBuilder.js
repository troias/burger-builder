import * as actionTypes from "./actionTypes";
import instance from "../../axios-orders";

//ADD INITIAL INGREDIENTS

 const setIngredient = (ingName) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredientName: ingName,
  };
};

//ERROR
const setError = () => {
     return {
       type: actionTypes.SET_ERROR_FAILED,
     };
   };


export const addInitialIngredients = () => {
  return (dispatch) => {
    instance.get("/ingrediens.json").then((res) => {
      dispatch(setIngredient(res.data));
    })
    .catch( () =>  {
     dispatch(setError());
    });
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
