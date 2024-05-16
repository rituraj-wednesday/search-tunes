import { put, call, takeLatest } from 'redux-saga/effects';
import { getSearchedList, getTrackInfo as getTrackInfoAPI } from '@services/itunesApi';
import { trackReduxTypes, trackReduxCreators } from './reducer';

// Individual exports for testing
const { REQUEST_GET_SEARCHED_TUNES, REQUEST_GET_TRACK_INFO } = trackReduxTypes;

const { successGetSearchedTunes, failureGetSearchedTunes, successGetTrackInfo, failureGetTrackInfo } =
  trackReduxCreators;

/**
 * A saga that handles fetching GitHub repositories based on a given repository name.
 * On success, it dispatches a success action with the fetched data.
 * On failure, it dispatches a failure action with the error data.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @param {Object} action - The action object containing the repository name.
 * @yields {Effect} The effect of calling the API, and then either the success or failure action.
 */
export function* getSearchedTuneList(action) {
  const response = yield call(getSearchedList, action.term);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSearchedTunes(data));
  } else {
    yield put(failureGetSearchedTunes(data));
  }
}
/**
 * registering events
 * @date 04/03/2024 - 12:57:49
 *
 * @export
 * @returns {{}}
 */
export function* searchListContainerSaga() {
  yield takeLatest(REQUEST_GET_SEARCHED_TUNES, getSearchedTuneList);
}

/**
 * A saga that handles fetching GitHub repositories based on a given repository name.
 * On success, it dispatches a success action with the fetched data.
 * On failure, it dispatches a failure action with the error data.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @param {Object} action - The action object containing the repository name.
 * @yields {Effect} The effect of calling the API, and then either the success or failure action.
 */
export function* getTrackInfo(action) {
  const response = yield call(getTrackInfoAPI, action.trackId);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetTrackInfo(data));
  } else {
    yield put(failureGetTrackInfo(data));
  }
}
/**
 * registering events
 * @date 04/03/2024 - 12:57:49
 *
 * @export
 * @returns {{}}
 */
export function* trackInfoContainerSaga() {
  yield takeLatest(REQUEST_GET_TRACK_INFO, getTrackInfo);
}
