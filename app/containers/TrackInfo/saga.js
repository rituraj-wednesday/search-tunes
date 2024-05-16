import { takeLatest } from 'redux-saga/effects';
import { trackInfoTypes } from './reducer';

// Individual exports for testing
const { DEFAULT_ACTION } = trackInfoTypes;

/**
 * defaultFunction to be called for trackInfo saga on default action
 *
 */
export function* defaultFunction(/* action */) {
  // console.log('Do something here')
}

/**
 * trackInfoSaga connect with TrackInfo container for saga
 *
 */
export default function* trackInfoSaga() {
  yield takeLatest(DEFAULT_ACTION, defaultFunction);
}
