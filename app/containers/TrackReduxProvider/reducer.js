/*
 *
 * SearchListContainer reducer
 *
 */
import { produce } from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const initialState = {
  term: null,
  error: null,
  loading: false,
  trackId: null,
  trackInfo: {}
};

export const { Types: trackReduxTypes, Creators: trackReduxCreators } = createActions({
  requestGetSearchedTunes: ['term'],
  successGetSearchedTunes: ['data'],
  failureGetSearchedTunes: ['error'],
  clearSearchList: [],
  requestGetTrackInfo: ['trackId'],
  successGetTrackInfo: ['data'],
  failureGetTrackInfo: ['error']
});

const trackInfoQueryCases = (draft, action) => {
  switch (action.type) {
    case trackReduxTypes.REQUEST_GET_TRACK_INFO:
      draft.trackId = action.trackId;
      draft.loading = true;
      break;
    case trackReduxTypes.SUCCESS_GET_TRACK_INFO:
      draft.trackInfo = action.data;
      draft.error = null;
      draft.loading = false;
      break;
    case trackReduxTypes.FAILURE_GET_TRACK_INFO:
      draft.error = get(action.error, 'message', 'something_went_wrong');
      draft.trackInfo = {};
      draft.loading = false;
      break;
  }
};

export const trackReduxProviderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case trackReduxTypes.REQUEST_GET_SEARCHED_TUNES:
        draft.term = action.term;
        draft.loading = true;
        break;
      case trackReduxTypes.CLEAR_SEARCH_LIST:
        draft.term = null;
        draft.error = null;
        draft.trackList = null;
        draft.loading = false;
        break;
      case trackReduxTypes.SUCCESS_GET_SEARCHED_TUNES:
        draft.trackList = action.data;
        draft.error = null;
        draft.loading = false;
        break;
      case trackReduxTypes.FAILURE_GET_SEARCHED_TUNES:
        draft.error = get(action.error, 'message', 'something_went_wrong');
        draft.trackList = null;
        draft.loading = false;
        break;
    }
    trackInfoQueryCases(draft, action);
  });

export default trackReduxProviderReducer;
