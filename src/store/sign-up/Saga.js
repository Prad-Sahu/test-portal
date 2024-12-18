import { call, put, takeEvery } from "redux-saga/effects";
import AXIOS_INSTANCE from "../../utils/Config";

import {
  signupLoading,
  submitSignupActionDispatcher,
  submitSignupErrorDispatcher,
  SUBMIT_SIGNUP_ACTION_REQUESTED,
} from "./Action"; // Path should come here

const postSignupAPI = async (postData) => {
  const result = await AXIOS_INSTANCE.post("signup", {
    ...postData,
  });
  return result;
};

function* submitSignupSaga({ postData }) {
  try {
    yield put(signupLoading(true));
    const data = yield call(postSignupAPI, postData);
    yield put(submitSignupActionDispatcher(data));
    yield put(submitSignupErrorDispatcher({}));
    yield put(signupLoading(false));
  } catch (e) {
    yield put(submitSignupActionDispatcher({}));
    yield put(submitSignupErrorDispatcher(e.response.data));
    yield put(signupLoading(false));
  }
}

function* submitSignupWatcher() {
  yield takeEvery(SUBMIT_SIGNUP_ACTION_REQUESTED, submitSignupSaga);
}
export default submitSignupWatcher;
