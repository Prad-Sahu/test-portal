// Utility helper functions
import _ from "lodash";
export const setUserAuthDetails = (userDetails) => {
  localStorage.setItem("user_auth_details", JSON.stringify(userDetails));
};

export const getAuthUserDetails = () => {
  let userAuthDetails = {};
  let userAuthDetailsObj = localStorage.getItem("user_auth_details");
  if (!(typeof userAuthDetailsObj === "object")) {
    try {
      userAuthDetails = JSON.parse(userAuthDetailsObj);
    } catch (error) {
      console.log("getAuthUserDetails Error: ", error);
      userAuthDetailsObj = "error";
    }
  }
  return userAuthDetails;
};

export const isUserLoggedIn = () => {
  if (_.isEmpty(getAuthUserDetails())) {
    return false;
  } else {
    return true;
  }
};
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
};

export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
