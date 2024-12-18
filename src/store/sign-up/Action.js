export const SUBMIT_SIGNUP_ACTION_REQUESTED = "SUBMIT_SIGNUP_ACTION_REQUESTED";
export const SUBMIT_SIGNUP_ACTION_DISPATCHER =
  "SUBMIT_SIGNUP_ACTION_DISPATCHER";
export const SUBMIT_SIGNUP_ERROR_DISPATCHER = "SUBMIT_SIGNUP_ERROR_DISPATCHER";
export const SIGNUP_LOADING = "SIGNUP_LOADING";
export const USER_LOGOUT = "USER_LOGOUT";

//Action Creator
export const submitSignupAction = (data) => ({
  type: SUBMIT_SIGNUP_ACTION_REQUESTED,
  postData: data,
});

//Action Dispatcher
export const submitSignupActionDispatcher = (data) => ({
  type: SUBMIT_SIGNUP_ACTION_DISPATCHER,
  payload: data,
});

export const submitSignupErrorDispatcher = (data) => ({
  type: SUBMIT_SIGNUP_ERROR_DISPATCHER,
  payload: data,
});

export const signupLoading = (loading) => ({
  type: SIGNUP_LOADING,
  payload: loading,
});