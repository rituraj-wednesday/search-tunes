import { searchListContainerReducer, searchListContainerTypes, initialState } from '../reducer';

describe('SearchListContainer reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(searchListContainerReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the updated state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = { ...initialState, somePayLoad: 'Mohammed Ali Chherawalla' };
    expect(
      searchListContainerReducer(initialState, {
        type: searchListContainerTypes.DEFAULT_ACTION,
        somePayLoad: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
