import {
  USERS_LOADING,
  SUBMIT_USERS_ACTION_DISPATCHER,
  GET_USERS_ACTION_REQUEST,
  SUBMIT_USERS_ERROR_DISPATCHER,
} from "./Action";

const initialState = {
  successData: { usersStatus: false, users: [] },
  failureData: {},
  loading: false,
  isLogout: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_ACTION_REQUEST:
      return { ...state, loading: true };
    case SUBMIT_USERS_ACTION_DISPATCHER:
      const data = action.payload?.data;
      // console.log("users reducer: ", data);
      if (data) {
        return {
          ...state,
          successData: {
            usersStatus: true,
            users: data?.users,
          },
          loading: false,
        };
      } else {
        return {
          ...state,
          successData: {
            usersStatus: false,
            users: {},
          },
          loading: false,
        };
      }
    case SUBMIT_USERS_ERROR_DISPATCHER:
      return {
        ...state,
        formError: action.payload,
        loading: false,
      };
    case USERS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
