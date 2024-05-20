/**
 * Test searchListContainer sagas
 */

import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getSearchedList } from '@services/itunesApi';
import { apiResponseGenerator, timeout } from '@utils/testUtils';
import { searchListContainerSaga, getSearchedTuneList, getTrackInfo, trackInfoContainerSaga } from '../saga';
import { trackReduxTypes } from '../reducer';
import { selectTrackInfo } from '../selectors';

function customEquality(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}


describe('TrackReduxProvider saga tests', () => {
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
  describe('Track Info saga tests', () => {
    const generator = trackInfoContainerSaga();
    const trackId = 1234;
    let getTrackInfoGenerator = getTrackInfo({ trackId });
  
    it('should start task to watch for REQUEST_GET_TRACK_INFO action', () => {
      expect(generator.next().value).toEqual(takeLatest(trackReduxTypes.REQUEST_GET_TRACK_INFO, getTrackInfo));
    });
  
    it('should ensure that the action FAILURE_GET_TRACK_INFO is dispatched when the api call fails', () => {
      let res = getTrackInfoGenerator.next().value;
      expect(customEquality(res, select(selectTrackInfo()))).toBe(true);
      res = getTrackInfoGenerator.next().value;
      expect(customEquality(res, call(getTrackInfo, trackId))).toBe(true);
      const errorResponse = {
        errorMessage: 'There was an error while fetching repo informations.'
      };
      expect(getTrackInfoGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
        put({
          type: trackReduxTypes.FAILURE_GET_TRACK_INFO,
          error: errorResponse
        })
      );
    });
  
    it('should ensure that the action SUCCESS_GET_SEARCHED_TUNES is dispatched when the api call succeeds', () => {
      getTrackInfoGenerator = getTrackInfo({ trackId });
      let res = getTrackInfoGenerator.next().value;
      expect(customEquality(res, select(selectTrackInfo()))).toBe(true);
      res = getTrackInfoGenerator.next().value;
      expect(customEquality(res, call(getTrackInfo, trackId))).toBe(true);
      const tracksResponse = {
        resultCount: 1,
        result: [{ trackId: 1 }]
      };
      expect(getTrackInfoGenerator.next(apiResponseGenerator(true, tracksResponse)).value).toEqual(
        put({
          type: trackReduxTypes.SUCCESS_GET_TRACK_INFO,
          data: tracksResponse
        })
      );
    });
  });
});