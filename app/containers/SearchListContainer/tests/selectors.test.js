import {
  selectSearchListContainer,
  selectTerm,
  selectLoading,
  selectError,
  selectTrackList,
} from '../selectors';

describe('SearchListContainer selector tests', () => {
  const mockedState = {
    searchListContainer: {
      term: 'Jack Johnson',
      loading: false,
      error: null,
      trackList: [],
    }
  };

  it('should select the searchListContainer state', () => {
    const searchListContainerSelector = selectSearchListContainer();
    expect(searchListContainerSelector(mockedState)).toEqual(mockedState.searchListContainer);
  });

  it('should select the term state', () => {
    const selectTermSelector = selectTerm();
    expect(selectTermSelector(mockedState)).toEqual(mockedState.searchListContainer.term);
  });

  it('should select the loading state', () => {
    const selectLoadingSelector = selectLoading();
    expect(selectLoadingSelector(mockedState)).toEqual(mockedState.searchListContainer.loading);
  });

  it('should select the error state', () => {
    const selectErrorSelector = selectError();
    expect(selectErrorSelector(mockedState)).toEqual(mockedState.searchListContainer.error);
  });

  it('should select the trackList state', () => {
    const selectTrackListSelector = selectTrackList();
    expect(selectTrackListSelector(mockedState)).toEqual(mockedState.searchListContainer.trackList);
  });
});
