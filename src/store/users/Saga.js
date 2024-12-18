import { call, put, takeEvery } from "redux-saga/effects";
import AXIOS_INSTANCE from "../../utils/Config";

import {
  usersLoading,
  getUsersActionDispatcher,
  getUsersErrorDispatcher,
  GET_USERS_ACTION_REQUEST,
} from "./Action"; // Path should come here

const postUsersAPI = async (postData) => {
  const result = await AXIOS_INSTANCE.get("users");
  return result;
};

function* getUsersSaga({ postData }) {
  try {
    yield put(usersLoading(true));
    const data = yield call(postUsersAPI, postData);
    yield put(getUsersActionDispatcher(data));
    yield put(getUsersErrorDispatcher({}));
    yield put(usersLoading(false));
  } catch (e) {
    yield put(getUsersActionDispatcher({}));
    yield put(getUsersErrorDispatcher(e.response.data));
    yield put(usersLoading(false));
  }
}

function* getUsersWatcher() {
  yield takeEvery(GET_USERS_ACTION_REQUEST, getUsersSaga);
}
export default getUsersWatcher;
