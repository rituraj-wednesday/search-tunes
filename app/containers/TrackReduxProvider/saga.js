import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getSearchedList, getTrackInfo as getTrackInfoAPI } from '@services/itunesApi';
import { trackReduxTypes, trackReduxCreators } from './reducer';
import { selectTrackInfo } from './selectors';

// Individual exports for testing
const { REQUEST_GET_SEARCHED_TUNES, REQUEST_GET_TRACK_INFO } = trackReduxTypes;

const { successGetSearchedTunes, failureGetSearchedTunes, successGetTrackInfo, failureGetTrackInfo } =
  trackReduxCreators;

/**
 * A saga that handles fetching iTunes search based on a given search term.
 * On success, it dispatches a success action with the fetched data.
 * On failure, it dispatches a failure action with the error data.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @param {Object} action - The action object containing the search term.
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

const checkIfTrackInfoExist = (trackInfo, trackId) =>
  trackInfo && (trackInfo.results || []).length >= 1 && trackInfo.results[0].trackId === +trackId;

/**
 * A saga that handles fetching Track Details according to trackId provided.
 * On success, it dispatches a success action with the fetched data.
 * On failure, it dispatches a failure action with the error data.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @param {Object} action - The action object containing the trackID.
 * @yields {Effect} The effect of calling the API, and then either the success or failure action.
 */
export function* getTrackInfo(action) {
  const trackInfo = yield select(selectTrackInfo());

  if (checkIfTrackInfoExist(trackInfo, action.trackId)) {
    return;
  }

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
