import { selectSearchListContainer, selectSomePayLoad } from '../selectors';

describe('SearchListContainer selector tests', () => {
  const mockedState = {
    searchListContainer: {
      somePayLoad: 'W.S'
    }
  };

  it('should select the searchListContainer state', () => {
    const searchListContainerSelector = selectSearchListContainer();
    expect(searchListContainerSelector(mockedState)).toEqual(mockedState.searchListContainer);
  });

  it('should select the somePayLoad state', () => {
    const somePayLoadSelector = selectSomePayLoad();
    expect(somePayLoadSelector(mockedState)).toEqual(mockedState.searchListContainer.somePayLoad);
  });
});
