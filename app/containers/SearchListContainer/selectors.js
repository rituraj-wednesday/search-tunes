import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

/**
 * Direct selector to the searchListContainer state domain
 */

const selectSearchListContainerDomain = (state) => state?.searchListContainer || initialState;

export const selectSearchListContainer = () => createSelector(selectSearchListContainerDomain, (substate) => substate);

export const selectTerm = () => createSelector(selectSearchListContainerDomain, (substate) => get(substate, 'term'));

export const selectTrackList = () =>
  createSelector(selectSearchListContainerDomain, (substate) => get(substate, 'trackList'));

export const selectError = () => createSelector(selectSearchListContainerDomain, (substate) => get(substate, 'error'));

export const selectLoading = () =>
  createSelector(selectSearchListContainerDomain, (substate) => get(substate, 'loading'));
