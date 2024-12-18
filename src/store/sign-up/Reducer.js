import {
  setUserAuthDetails,
} from "../../utils/Helpers";
import {
  SIGNUP_LOADING,
  SUBMIT_SIGNUP_ACTION_DISPATCHER,
  SUBMIT_SIGNUP_ACTION_REQUESTED,
  SUBMIT_SIGNUP_ERROR_DISPATCHER,
} from "./Action";

const initialState = {
  successData: { loginStatus: false, loginMessage: "", loginDetails: {} },
  failureData: {},
  loading: false,
  isLogout: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_SIGNUP_ACTION_REQUESTED:
      return { ...state, loading: true };
    case SUBMIT_SIGNUP_ACTION_DISPATCHER:
      const data = action.payload?.data;
      // console.log("data: ", data);
      if (data) {
        setUserAuthDetails(data);
        return {
          ...state,
          successData: {
            loginStatus: true,
            loginDetails: data,
            loginMessage: "User Found!",
          },
          loading: false,
        };
      } else {
        return {
          ...state,
          successData: {
            loginStatus: false,
            loginDetails: {},
            loginMessage: "User NOT Found!",
          },
          loading: false,
        };
      }
    case SUBMIT_SIGNUP_ERROR_DISPATCHER:
      return {
        ...state,
        formError: action.payload,
        loading: false,
      };
    case SIGNUP_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
