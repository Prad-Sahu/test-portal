import { call, put, takeEvery } from "redux-saga/effects";
import AXIOS_INSTANCE from "../../utils/Config";

import {
  postsLoading,
  getPostsActionDispatcher,
  getPostsErrorDispatcher,
  GET_POSTS_ACTION_REQUEST,
} from "./Action"; // Path should come here

const postPostsAPI = async (postData) => {
  const result = await AXIOS_INSTANCE.get("posts");
  return result;
};

function* getPostsSaga({ postData }) {
  try {
    yield put(postsLoading(true));
    const data = yield call(postPostsAPI, postData);
    yield put(getPostsActionDispatcher(data));
    yield put(getPostsErrorDispatcher({}));
    yield put(postsLoading(false));
  } catch (e) {
    yield put(getPostsActionDispatcher({}));
    yield put(getPostsErrorDispatcher(e.response.data));
    yield put(postsLoading(false));
  }
}

function* getPostsWatcher() {
  yield takeEvery(GET_POSTS_ACTION_REQUEST, getPostsSaga);
}
export default getPostsWatcher;
