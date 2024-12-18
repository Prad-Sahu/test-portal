export const GET_USERS_ACTION_REQUEST = "GET_USERS_ACTION_REQUEST";
export const SUBMIT_USERS_ACTION_DISPATCHER = "SUBMIT_USERS_ACTION_DISPATCHER";
export const SUBMIT_USERS_ERROR_DISPATCHER = "SUBMIT_USERS_ERROR_DISPATCHER";
export const USERS_LOADING = "USERS_LOADING";
export const USER_LOGOUT = "USER_LOGOUT";

//Action Creator
export const getUsersAction = (data) => ({
  type: GET_USERS_ACTION_REQUEST,
  postData: data,
});

//Action Dispatcher
export const getUsersActionDispatcher = (data) => ({
  type: SUBMIT_USERS_ACTION_DISPATCHER,
  payload: data,
});

export const getUsersErrorDispatcher = (data) => ({
  type: SUBMIT_USERS_ERROR_DISPATCHER,
  payload: data,
});

export const usersLoading = (loading) => ({
  type: USERS_LOADING,
  payload: loading,
});
