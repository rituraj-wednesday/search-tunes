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
  loading: false
};

export const { Types: trackReduxTypes, Creators: trackReduxCreators } = createActions({
  requestGetSearchedTunes: ['term'],
  successGetSearchedTunes: ['data'],
  failureGetSearchedTunes: ['error'],
  clearSearchList: []
});

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
  });

export default trackReduxProviderReducer;
