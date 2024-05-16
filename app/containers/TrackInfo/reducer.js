/*
 *
 * TrackInfo reducer
 *
 */
import { produce } from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  somePayLoad: null
};

export const { Types: trackInfoTypes, Creators: trackInfoCreators } = createActions({
  tempAction1: [],
  tempAction2: [],
  tempAction3: [],
  defaultAction: ['somePayLoad']
});

export const trackInfoReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case trackInfoTypes.TEMP_ACTION_1:
        draft.someTempPayload = action.someTempPayload;
        break;
      case trackInfoTypes.DEFAULT_ACTION:
      default:
        draft.somePayLoad = action.somePayLoad;
    }
  });

export default trackInfoReducer;
