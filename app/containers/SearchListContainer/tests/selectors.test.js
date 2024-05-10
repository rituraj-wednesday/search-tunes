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

  // it('should select the term state', () => {
  //   const selectTermSelector = selectTerm();
  //   expect(selectTermSelector(mockedState.term)).toEqual(mockedState.term);
  // });

  // it('should select the loading state', () => {
  //   const selectLoadingSelector = selectLoading();
  //   expect(selectLoadingSelector(mockedState.loading)).toEqual(mockedState.loading);
  // });

  // it('should select the error state', () => {
  //   const selectErrorSelector = selectError();
  //   expect(selectErrorSelector(mockedState.error)).toEqual(mockedState.error);
  // });

  it('should select the trackList state', () => {
    const selectTrackListSelector = selectTrackList();
    expect(selectTrackListSelector(mockedState.trackList)).toEqual(mockedState.trackList);
  });
});
