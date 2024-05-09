/*
 *
 * SearchListContainer reducer
 *
 */
import { produce } from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  somePayLoad: null
};

export const { Types: searchListContainerTypes, Creators: searchListContainerCreators } = createActions({
  defaultAction: ['somePayLoad']
});

export const searchListContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    // eslint-disable-next-line sonarjs/no-small-switch
    switch (action.type) {
      case searchListContainerTypes.DEFAULT_ACTION:
        draft.somePayLoad = action.somePayLoad;
        break;
      default:
    }
  });

export default searchListContainerReducer;
