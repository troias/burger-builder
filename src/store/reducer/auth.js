import * as actionTypes from "../actions/actionTypes";
import * as utilityFunctions from './utilityFunctions/AuthUtilityFunctions'

const intialState = {
    token: null,
    userID: null, 
    error: null,
    loading: false, 
    LoggedIn: false,
    authRedirectPath: '/'

  }

  const reducer = (state = intialState, action) => {

    switch (action.type) {
  
      case actionTypes.AUTH_START: return utilityFunctions.authStart(state, action)
      case actionTypes.AUTH_SUCCESS: return utilityFunctions.authSuccess(state, action)
      case actionTypes.AUTH_FAIL: return utilityFunctions.authFail(state, action)
      case actionTypes.LOG_OUT: return utilityFunctions.authLogOut(state, action)
      case actionTypes.SET_AUTH_REDIRECT_PATH: return utilityFunctions.setAuthRedirectPath(state, action) 
      
      default: return state
    }
  };
  
  export default reducer;
  