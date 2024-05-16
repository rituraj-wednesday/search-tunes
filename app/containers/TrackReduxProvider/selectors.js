import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

/**
 * Direct selector to the trackReduxProvider state domain
 */

const selectTrackReduxProviderDomain = (state) => state?.trackReduxProvider || initialState;

export const selectTrackReduxProvider = () => createSelector(selectTrackReduxProviderDomain, (substate) => substate);

export const selectSearchListContainer = () => createSelector(selectTrackReduxProviderDomain, (substate) => substate);

export const selectTerm = () => createSelector(selectTrackReduxProviderDomain, (substate) => get(substate, 'term'));

export const selectTrackList = () =>
  createSelector(selectTrackReduxProviderDomain, (substate) => get(substate, 'trackList'));

export const selectError = () => createSelector(selectTrackReduxProviderDomain, (substate) => get(substate, 'error'));

export const selectLoading = () =>
  createSelector(selectTrackReduxProviderDomain, (substate) => get(substate, 'loading'));

export const selectTrackInfo = () =>
  createSelector(selectTrackReduxProviderDomain, (substate) => get(substate, 'trackInfo'));
