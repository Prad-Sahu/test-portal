import {
  UPDATE_USER_LOADING,
  UPDATE_USER_ACTION_DISPATCHER,
  UPDATE_USER_ACTION_REQUEST,
  UPDATE_USER_ERROR_DISPATCHER,
} from "./Action";

const initialState = {
  successData: { updateUserStatus: false, response: [] },
  failureData: {},
  loading: false,
  isLogout: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_ACTION_REQUEST:
      return { ...state, loading: true };
    case UPDATE_USER_ACTION_DISPATCHER:
      const data = action.payload?.data;
      console.log("updateUser reducer: ", data);
      if (data) {
        return {
          ...state,
          successData: {
            updateUserStatus: true,
            response: data,
          },
          loading: false,
        };
      } else {
        return {
          ...state,
          successData: {
            updateUserStatus: false,
            response: {},
          },
          loading: false,
        };
      }
    case UPDATE_USER_ERROR_DISPATCHER:
      return {
        ...state,
        formError: action.payload,
        loading: false,
      };
    case UPDATE_USER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
