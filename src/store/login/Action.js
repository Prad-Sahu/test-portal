export const SUBMIT_LOGIN_ACTION_REQUESTED = "SUBMIT_LOGIN_ACTION_REQUESTED";
export const SUBMIT_LOGIN_ACTION_DISPATCHER = "SUBMIT_LOGIN_ACTION_DISPATCHER";
export const SUBMIT_LOGIN_ERROR_DISPATCHER = "SUBMIT_LOGIN_ERROR_DISPATCHER";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const USER_LOGOUT = "USER_LOGOUT";

//Action Creator
export const submitLoginAction = (data) => ({
  type: SUBMIT_LOGIN_ACTION_REQUESTED,
  postData: data,
});

//Action Dispatcher
export const submitLoginActionDispatcher = (data) => ({
  type: SUBMIT_LOGIN_ACTION_DISPATCHER,
  payload: data,
});

export const submitLoginErrorDispatcher = (data) => ({
  type: SUBMIT_LOGIN_ERROR_DISPATCHER,
  payload: data,
});

export const loginLoading = (loading) => ({
  type: LOGIN_LOADING,
  payload: loading,
});

export const logout = () => ({
  type: USER_LOGOUT,
});
