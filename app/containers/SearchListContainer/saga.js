import { takeLatest } from 'redux-saga/effects';
import { searchListContainerTypes } from './reducer';

// Individual exports for testing
const { DEFAULT_ACTION } = searchListContainerTypes;

/**
 * registering events
 * @date 04/03/2024 - 12:57:49
 *
 * @export
 * @returns {{}}
 */
export function* defaultFunction(/* action */) {
  // console.log('Do something here')
}

/**
 * registering events
 * @date 04/03/2024 - 12:57:49
 *
 * @export
 * @returns {{}}
 */
export default function* searchListContainerSaga() {
  yield takeLatest(DEFAULT_ACTION, defaultFunction);
}
