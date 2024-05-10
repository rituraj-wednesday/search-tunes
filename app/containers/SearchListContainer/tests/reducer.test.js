import { searchListContainerReducer, searchListContainerTypes, initialState } from '../reducer';

describe('SearchListContainer reducer tests', () => {
  afterEach(() => {
    searchListContainerReducer(undefined, {});
  })
  it('should return the initial state by default', () => {
    expect(searchListContainerReducer(undefined, {})).toEqual(initialState);
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
});
