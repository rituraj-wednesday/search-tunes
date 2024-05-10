import { searchListContainerReducer, searchListContainerTypes, initialState } from '../reducer';

describe('SearchListContainer reducer tests', () => {
  it('should return the initial state by default', () => {
    const res = searchListContainerReducer(undefined, {})
    expect(res).toEqual(initialState);
  });

  it('should return the updated state when an action of type REQUEST_GET_SEARCHED_TUNES is dispatched', () => {
    const dummyTerm = 'Jack Johnsonn';
    const expectedResult = {
      ...initialState,
      term: dummyTerm,
      loading: true,
    };
    expect(
      searchListContainerReducer(initialState, {
        type: searchListContainerTypes.REQUEST_GET_SEARCHED_TUNES,
        term: dummyTerm
      })
    ).toEqual(expectedResult);
  });

  it('should return the updated state when an action of type CLEAR_SEARCH_LIST is dispatched', () => {
    const expectedResult = {
      ...initialState,
      trackList: null,
    };
    expect(
      searchListContainerReducer(initialState, {
        type: searchListContainerTypes.CLEAR_SEARCH_LIST
      })
    ).toEqual(expectedResult);
  });

  it('should return the updated state when an action of type SUCCESS_GET_SEARCHED_TUNESS is dispatched', () => {
    const trackList = {
      resultCount: 0,
      results: [],
    }
    const expectedResult = {
      ...initialState,
      trackList,
    };
    expect(
      searchListContainerReducer(initialState, {
        type: searchListContainerTypes.SUCCESS_GET_SEARCHED_TUNESS,
        data: trackList
      })
    ).toEqual(expectedResult);
  });

  it('should return the updated state when an action of type FAILURE_GET_SEARCHED_TUNES is dispatched', () => {
    const expectedResult = {
      ...initialState,
      trackList: null,
      error: 'something_went_wrong',
      loading: false,
    };
    expect(
      searchListContainerReducer(initialState, {
        type: searchListContainerTypes.FAILURE_GET_SEARCHED_TUNES,
        error: {
          message: 'something_went_wrong'
        }
      })
    ).toEqual(expectedResult);
  });
});
