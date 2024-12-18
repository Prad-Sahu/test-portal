import { call, put, takeEvery } from "redux-saga/effects";
import AXIOS_INSTANCE from "../../utils/Config";

import {
  updatePostLoading,
  updatePostActionDispatcher,
  updatePostErrorDispatcher,
  UPDATE_POST_ACTION_REQUEST,
} from "./Action"; // Path should come here

const postPostsAPI = async (postData) => {
  const result = await AXIOS_INSTANCE.put(
    "posts/" + postData.id,
    postData.data
  );
  return result;
};

function* updatePostSaga({ postData }) {
  try {
    yield put(updatePostLoading(true));
    const data = yield call(postPostsAPI, postData);
    yield put(updatePostActionDispatcher(data));
    yield put(updatePostErrorDispatcher({}));
    yield put(updatePostLoading(false));
  } catch (e) {
    yield put(updatePostActionDispatcher({}));
    yield put(updatePostErrorDispatcher(e.response.data));
    yield put(updatePostLoading(false));
  }
}

function* updatePostWatcher() {
  yield takeEvery(UPDATE_POST_ACTION_REQUEST, updatePostSaga);
}
export default updatePostWatcher;
