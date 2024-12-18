import {
  POSTS_LOADING,
  SUBMIT_POSTS_ACTION_DISPATCHER,
  GET_POSTS_ACTION_REQUEST,
  SUBMIT_POSTS_ERROR_DISPATCHER,
} from "./Action";

const initialState = {
  successData: { postsStatus: false, posts: [] },
  failureData: {},
  loading: false,
  isLogout: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_ACTION_REQUEST:
      return { ...state, loading: true };
    case SUBMIT_POSTS_ACTION_DISPATCHER:
      const data = action.payload?.data;
      // console.log("posts reducer: ", data);
      if (data) {
        return {
          ...state,
          successData: {
            postsStatus: true,
            posts: data?.posts,
          },
          loading: false,
        };
      } else {
        return {
          ...state,
          successData: {
            postsStatus: false,
            posts: {},
          },
          loading: false,
        };
      }
    case SUBMIT_POSTS_ERROR_DISPATCHER:
      return {
        ...state,
        formError: action.payload,
        loading: false,
      };
    case POSTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
