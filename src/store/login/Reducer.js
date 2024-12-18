import { setUserAuthDetails } from "../../utils/Helpers";
import {
  LOGIN_LOADING,
  USER_LOGOUT,
  SUBMIT_LOGIN_ACTION_DISPATCHER,
  SUBMIT_LOGIN_ACTION_REQUESTED,
  SUBMIT_LOGIN_ERROR_DISPATCHER,
} from "./Action";

const initialState = {
  successData: { loginStatus: false, loginMessage: "", loginDetails: {} },
  failureData: {},
  loading: false,
  isLogout: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_LOGIN_ACTION_REQUESTED:
      return { ...state, loading: true };
    case SUBMIT_LOGIN_ACTION_DISPATCHER:
      const data = action.payload;
      if (data.id) {
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
        alert("Authentication failed!", data);
        console.log("data: ", data);
        return {
          ...state,
          successData: {
            loginStatus: false,
            loginDetails: {},
            loginMessage: data.message,
          },
          loading: false,
        };
      }
    case SUBMIT_LOGIN_ERROR_DISPATCHER:
      return {
        ...state,
        formError: action.payload,
        loading: false,
      };
    case LOGIN_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case USER_LOGOUT:
      // if ("caches" in window) {
      //   caches.keys().then((names) => {
      //     names.forEach((name) => {
      //       caches.delete(name);
      //     });
      //   });
      // }
      localStorage.clear();
      // localStorage.clear();
      // caches.clear();
      return { ...state, isLogout: true };
    default:
      return state;
  }
};

export default reducer;
