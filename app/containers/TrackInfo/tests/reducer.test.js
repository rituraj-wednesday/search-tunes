import { trackInfoReducer, trackInfoTypes, initialState } from '../reducer';

describe('TrackInfo reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(trackInfoReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the updated state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = { ...initialState, somePayLoad: 'Mohammed Ali Chherawalla' };
    expect(
      trackInfoReducer(initialState, {
        type: trackInfoTypes.DEFAULT_ACTION,
        somePayLoad: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
