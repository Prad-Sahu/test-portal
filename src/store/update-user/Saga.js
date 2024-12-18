import { call, put, takeEvery } from "redux-saga/effects";
import AXIOS_INSTANCE from "../../utils/Config";

import {
  updateUserLoading,
  updateUserActionDispatcher,
  updateUserErrorDispatcher,
  UPDATE_USER_ACTION_REQUEST,
} from "./Action"; // Path should come here

const postUsersAPI = async (postData) => {
  const result = await AXIOS_INSTANCE.put(
    "users/" + postData.id,
    postData.data
  );
  return result;
};

function* updateUserSaga({ postData }) {
  try {
    yield put(updateUserLoading(true));
    const data = yield call(postUsersAPI, postData);
    yield put(updateUserActionDispatcher(data));
    yield put(updateUserErrorDispatcher({}));
    yield put(updateUserLoading(false));
  } catch (e) {
    yield put(updateUserActionDispatcher({}));
    yield put(updateUserErrorDispatcher(e.response.data));
    yield put(updateUserLoading(false));
  }
}

function* updateUserWatcher() {
  yield takeEvery(UPDATE_USER_ACTION_REQUEST, updateUserSaga);
}
export default updateUserWatcher;
