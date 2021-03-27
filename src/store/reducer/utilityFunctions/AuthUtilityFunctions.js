import { updateObject } from '../../utility/utility'

export const authStart = (state, action) => {
  const loading = {
    loading: true,
    error: null
  }
  return updateObject(state, loading);
}

export const authSuccess = (state, action) => {
  const authDetails = {
    token: action.idToken,
    userID: action.userId,
    loading: false, 
    error: null
  }
  return updateObject(state, authDetails);
}

export const authFail = (state, action) => {
  const error = { 
    error: action.error, 
    loading: false 
  }
  return updateObject(state, error);
}

export const authLogOut = (state, action) => {
  const logOut = {
    token: null, 
    userID: null
  }
  return updateObject(state, logOut);
}

export const setAuthRedirectPath = (state, action) => {
  const authRedirect = {
    authRedirectPath: action.path
  }
  return updateObject(state, authRedirect);
}