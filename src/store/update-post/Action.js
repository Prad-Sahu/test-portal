export const UPDATE_POST_ACTION_REQUEST = "UPDATE_POST_ACTION_REQUEST";
export const UPDATE_POST_ACTION_DISPATCHER = "UPDATE_POST_ACTION_DISPATCHER";
export const UPDATE_POST_ERROR_DISPATCHER = "UPDATE_POST_ERROR_DISPATCHER";
export const UPDATE_POST_LOADING = "UPDATE_POST_LOADING";
export const USER_LOGOUT = "USER_LOGOUT";

//Action Creator
export const updatePostAction = (data) => ({
  type: UPDATE_POST_ACTION_REQUEST,
  postData: data,
});

//Action Dispatcher
export const updatePostActionDispatcher = (data) => ({
  type: UPDATE_POST_ACTION_DISPATCHER,
  payload: data,
});

export const updatePostErrorDispatcher = (data) => ({
  type: UPDATE_POST_ERROR_DISPATCHER,
  payload: data,
});

export const updatePostLoading = (loading) => ({
  type: UPDATE_POST_LOADING,
  payload: loading,
});
