export const UPDATE_USER_ACTION_REQUEST = "UPDATE_USER_ACTION_REQUEST";
export const UPDATE_USER_ACTION_DISPATCHER = "UPDATE_USER_ACTION_DISPATCHER";
export const UPDATE_USER_ERROR_DISPATCHER = "UPDATE_USER_ERROR_DISPATCHER";
export const UPDATE_USER_LOADING = "USERS_LOADING";
export const USER_LOGOUT = "USER_LOGOUT";

//Action Creator
export const updateUserAction = (data) => ({
  type: UPDATE_USER_ACTION_REQUEST,
  postData: data,
});

//Action Dispatcher
export const updateUserActionDispatcher = (data) => ({
  type: UPDATE_USER_ACTION_DISPATCHER,
  payload: data,
});

export const updateUserErrorDispatcher = (data) => ({
  type: UPDATE_USER_ERROR_DISPATCHER,
  payload: data,
});

export const updateUserLoading = (loading) => ({
  type: UPDATE_USER_LOADING,
  payload: loading,
});
