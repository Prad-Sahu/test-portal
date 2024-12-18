import {
  UPDATE_POST_LOADING,
  UPDATE_POST_ACTION_DISPATCHER,
  UPDATE_POST_ACTION_REQUEST,
  UPDATE_POST_ERROR_DISPATCHER,
} from "./Action";

const initialState = {
  successData: { postUpdateStatus: false, response: [] },
  failureData: {},
  loading: false,
  isLogout: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_POST_ACTION_REQUEST:
      return { ...state, loading: true };
    case UPDATE_POST_ACTION_DISPATCHER:
      const data = action.payload;
      if (data) {
        return {
          ...state,
          successData: {
            postUpdateStatus: true,
            response: data,
          },
          loading: false,
        };
      } else {
        return {
          ...state,
          successData: {
            postUpdateStatus: false,
            response: data,
          },
          loading: false,
        };
      }
    case UPDATE_POST_ERROR_DISPATCHER:
      return {
        ...state,
        formError: action.payload,
        loading: false,
      };
    case UPDATE_POST_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
