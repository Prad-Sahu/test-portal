import { call, put, takeEvery } from "redux-saga/effects";
import AXIOS_INSTANCE from "../../utils/Config";

import {
  loginLoading,
  submitLoginActionDispatcher,
  submitLoginErrorDispatcher,
  SUBMIT_LOGIN_ACTION_REQUESTED,
} from "./Action";

const postLoginAPI = async (postData) => {
  const result = await AXIOS_INSTANCE.post("auth/login", {
    ...postData,
  });
  return result;
};

function* submitLoginSaga({ postData }) {
  try {
    yield put(loginLoading(true)); // Indicate loading state

    const data = yield call(postLoginAPI, postData);

    // If successful, dispatch the success action
    if (data?.status === 200) {
      yield put(submitLoginActionDispatcher(data.data));
      yield put(submitLoginErrorDispatcher({}));
    } else {
      // In case of an error response from the server
      yield put(
        submitLoginErrorDispatcher(
          data?.data || { message: "Unexpected error occurred" }
        )
      );
    }
  } catch (e) {
    // Catch errors from API call
    yield put(submitLoginActionDispatcher({}));
    yield put(
      submitLoginErrorDispatcher(
        e?.response?.data || { message: "An error occurred. Please try again." }
      )
    );
  } finally {
    yield put(loginLoading(false)); // Stop loading regardless of success or failure
  }
}

function* submitLoginWatcher() {
  yield takeEvery(SUBMIT_LOGIN_ACTION_REQUESTED, submitLoginSaga);
}

export default submitLoginWatcher;
