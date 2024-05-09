import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the searchListContainer state domain
 */

const selectSearchListContainerDomain = (state) => state.searchListContainer || initialState;

export const selectSearchListContainer = () => createSelector(selectSearchListContainerDomain, (substate) => substate);

export const selectSomePayLoad = () =>
  createSelector(selectSearchListContainerDomain, (substate) => substate.somePayLoad);
