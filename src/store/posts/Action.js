export const GET_POSTS_ACTION_REQUEST = "GET_POSTS_ACTION_REQUEST";
export const SUBMIT_POSTS_ACTION_DISPATCHER = "SUBMIT_POSTS_ACTION_DISPATCHER";
export const SUBMIT_POSTS_ERROR_DISPATCHER = "SUBMIT_POSTS_ERROR_DISPATCHER";
export const POSTS_LOADING = "POSTS_LOADING";
export const USER_LOGOUT = "USER_LOGOUT";

//Action Creator
export const getPostsAction = (data) => ({
  type: GET_POSTS_ACTION_REQUEST,
  postData: data,
});

//Action Dispatcher
export const getPostsActionDispatcher = (data) => ({
  type: SUBMIT_POSTS_ACTION_DISPATCHER,
  payload: data,
});

export const getPostsErrorDispatcher = (data) => ({
  type: SUBMIT_POSTS_ERROR_DISPATCHER,
  payload: data,
});

export const postsLoading = (loading) => ({
  type: POSTS_LOADING,
  payload: loading,
});
