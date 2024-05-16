import { selectTrackInfo, selectSomePayLoad } from '../selectors';

describe('TrackInfo selector tests', () => {
  const mockedState = {
    trackInfo: {
      somePayLoad: 'W.S'
    }
  };

  it('should select the trackInfo state', () => {
    const trackInfoSelector = selectTrackInfo();
    expect(trackInfoSelector(mockedState)).toEqual(mockedState.trackInfo);
  });

  it('should select the somePayLoad state', () => {
    const somePayLoadSelector = selectSomePayLoad();
    expect(somePayLoadSelector(mockedState)).toEqual(mockedState.trackInfo.somePayLoad);
  });
});
