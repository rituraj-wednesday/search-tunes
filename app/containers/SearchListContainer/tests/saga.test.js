/**
 * Test searchListContainer sagas
 */

import { takeLatest } from 'redux-saga/effects';
import searchListContainerSaga, { defaultFunction } from '../saga';
import { searchListContainerTypes } from '../reducer';

describe('SearchListContainer saga tests', () => {
  const generator = searchListContainerSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    // expect(generator.next().value).toEqual(takeLatest(searchListContainerTypes.DEFAULT_ACTION, defaultFunction));
  });
});
