import {
  selectSearchListContainer,
  selectTerm,
  selectLoading,
  selectError,
  selectTrackList,
} from '../selectors';
import { initialState } from '../reducer';

describe('SearchListContainer selector tests', () => {
  const mockedState = {
    trackReduxProvider: {
      term: 'Jack Johnson',
      loading: false,
      error: null,
      trackList: [],
    }
  };

  it('should select the searchListContainer state', () => {
    const searchListContainerSelector = selectSearchListContainer();
    expect(searchListContainerSelector(mockedState)).toEqual(mockedState.trackReduxProvider);
  });

  it('should select the searchListContainer with initialState', () => {
    const searchListContainerSelector = selectSearchListContainer();
    expect(searchListContainerSelector()).toEqual(initialState);
  });

  it('should select the term state', () => {
    const selectTermSelector = selectTerm();
    expect(selectTermSelector(mockedState)).toEqual(mockedState.trackReduxProvider.term);
  });

  it('should select the loading state', () => {
    const selectLoadingSelector = selectLoading();
    expect(selectLoadingSelector(mockedState)).toEqual(mockedState.trackReduxProvider.loading);
  });

  it('should select the error state', () => {
    const selectErrorSelector = selectError();
    expect(selectErrorSelector(mockedState)).toEqual(mockedState.trackReduxProvider.error);
  });

  it('should select the trackList state', () => {
    const selectTrackListSelector = selectTrackList();
    expect(selectTrackListSelector(mockedState)).toEqual(mockedState.trackReduxProvider.trackList);
  });
});
