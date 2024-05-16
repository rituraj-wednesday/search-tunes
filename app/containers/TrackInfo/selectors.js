import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the trackInfo state domain
 */

const selectTrackInfoDomain = (state) => state.trackInfo || initialState;

export const selectTrackInfo = () => createSelector(selectTrackInfoDomain, (substate) => substate);

export const selectSomePayLoad = () => createSelector(selectTrackInfoDomain, (substate) => substate.somePayLoad);
