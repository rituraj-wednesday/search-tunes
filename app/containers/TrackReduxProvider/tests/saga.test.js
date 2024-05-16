/**
 * Test searchListContainer sagas
 */

import { takeLatest, call, put } from 'redux-saga/effects';
import { getSearchedList } from '@services/itunesApi';
import { apiResponseGenerator } from '@utils/testUtils';
import { searchListContainerSaga, getSearchedTuneList } from '../saga';
import { trackReduxTypes } from '../reducer';

describe('SearchListContainer saga tests', () => {
  const generator = searchListContainerSaga();
  const term = 'Jack+Johnson';
  let getSearchListGenerator = getSearchedTuneList({ term });

  it('should start task to watch for REQUEST_GET_SEARCHED_TUNES action', () => {
    expect(generator.next().value).toEqual(takeLatest(trackReduxTypes.REQUEST_GET_SEARCHED_TUNES, getSearchedTuneList));
  });

  it('should ensure that the action FAILURE_GET_SEARCHED_TUNES is dispatched when the api call fails', () => {
    const res = getSearchListGenerator.next().value;
    expect(res).toEqual(call(getSearchedList, term));
    const errorResponse = {
      errorMessage: 'There was an error while fetching repo informations.'
    };
    expect(getSearchListGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: trackReduxTypes.FAILURE_GET_SEARCHED_TUNES,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_SEARCHED_TUNES is dispatched when the api call succeeds', () => {
    getSearchListGenerator = getSearchedTuneList({ term });
    const res = getSearchListGenerator.next().value;
    expect(res).toEqual(call(getSearchedList, term));
    const tracksResponse = {
      resultCount: 1,
      result: [{ trackId: 1 }]
    };
    expect(getSearchListGenerator.next(apiResponseGenerator(true, tracksResponse)).value).toEqual(
      put({
        type: trackReduxTypes.SUCCESS_GET_SEARCHED_TUNES,
        data: tracksResponse
      })
    );
  });
});
