import { trackReduxTypes, trackReduxProviderReducer, initialState } from '../reducer';

describe('Track Redux Provider tests', () => {
  it('should return the initial state by default', () => {
    const res = trackReduxProviderReducer(undefined, {})
    expect(res).toEqual(initialState);
  });

  describe('Search List reducer tests', () => {
    it('should return the updated state when an action of type REQUEST_GET_SEARCHED_TUNES is dispatched', () => {
      const dummyTerm = 'Jack Johnsonn';
      const expectedResult = {
        ...initialState,
        term: dummyTerm,
        loading: true,
      };
      expect(
        trackReduxProviderReducer(initialState, {
          type: trackReduxTypes.REQUEST_GET_SEARCHED_TUNES,
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
        trackReduxProviderReducer(initialState, {
          type: trackReduxTypes.CLEAR_SEARCH_LIST
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
        trackReduxProviderReducer(initialState, {
          type: trackReduxTypes.SUCCESS_GET_SEARCHED_TUNES,
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
        trackReduxProviderReducer(initialState, {
          type: trackReduxTypes.FAILURE_GET_SEARCHED_TUNES,
          error: {
            message: 'something_went_wrong'
          }
        })
      ).toEqual(expectedResult);
    });
  });

  describe('TrackInfo reducer tests', () => {
    const tempTrackID = 1;
    const tempTrack = [{
      trackId: tempTrackID,
    }]
    it('should return the updated state when an action of type REQUEST_GET_TRACK_INFO is dispatched', () => {const dummyTerm = 'Jack Johnsonn';
      const expectedResult = {
        ...initialState,
        trackId: tempTrackID,
        loading: true,
      };
      expect(
        trackReduxProviderReducer(initialState, {
          type: trackReduxTypes.REQUEST_GET_TRACK_INFO,
          trackId: tempTrackID
        })
      ).toEqual(expectedResult);
    });
    it('should return the updated state when an action of type SUCCESS_GET_TRACK_INFO is dispatched', () => {const dummyTerm = 'Jack Johnsonn';
      const expectedResult = {
        ...initialState,
        trackInfo: tempTrack,
        error: null,
        loading: false,
      };
      expect(
        trackReduxProviderReducer(initialState, {
          type: trackReduxTypes.SUCCESS_GET_TRACK_INFO,
          data: tempTrack,
        })
      ).toEqual(expectedResult);
    });
    it('should return the updated state when an action of type FAILURE_GET_TRACK_INFO is dispatched', () => {const dummyTerm = 'Jack Johnsonn';
      const message = 'Something went wrong.';;
      const expectedResult = {
        ...initialState,
        trackInfo: null,
        error: message,
      };
      expect(
        trackReduxProviderReducer(initialState, {
          type: trackReduxTypes.FAILURE_GET_TRACK_INFO,
          error: {
            message,
          },
        })
      ).toEqual(expectedResult);
    });
    it('should return the updated state when an action of type SET_TRACK_INFO_FROM_STATE is dispatched', () => {const dummyTerm = 'Jack Johnsonn';
      const expectedResult = {
        ...initialState,
        trackInfo: {
          resultCount: tempTrack.length,
          results: tempTrack,
        },
        trackId: tempTrackID,
        loading: false,
      };
      expect(
        trackReduxProviderReducer(initialState, {
          type: trackReduxTypes.SET_TRACK_INFO_FROM_STATE,
          results: tempTrack,
        })
      ).toEqual(expectedResult);
    });
  });
});
