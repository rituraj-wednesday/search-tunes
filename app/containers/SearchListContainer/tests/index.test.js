/**
 *
 * Tests for SearchListContainer container
 *
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { timeout, renderWithIntl } from '@utils/testUtils';
import { SearchListContainerTest as SearchListContainer, mapDispatchToProps } from '../index';
import { translate } from '@app/utils/index';
import { trackReduxTypes } from '../../TrackReduxProvider/reducer';

jest.mock('react-redux', () => {
  return {
    connect: () => (comp) => comp,
  }
});

describe('<SearchListContainer /> container tests', () => {

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<SearchListContainer />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render and match the snapshot when there is trackList', () => {
    const { baseElement } = renderWithIntl(<SearchListContainer trackList={{ resultCount: 1, results: [{ trackId: 1 }]}}/>);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearList on empty change', async () => {
    const mockedDispatchSearchList = jest.fn();
    const mockedDispatchClearList = jest.fn();
    const { getByLabelText } = renderWithIntl(
      <SearchListContainer
        dispatchSearchList={mockedDispatchSearchList}
        dispatchClearList={mockedDispatchClearList}
      />
    );
    fireEvent.change(getByLabelText(translate('searchBar')), {
      target: { value: 'a' }
    });
    await timeout(700);
    expect(mockedDispatchSearchList).toHaveBeenCalled();
    fireEvent.change(getByLabelText(translate('searchBar')), {
      target: { value: '' }
    });
    await timeout(700);
    expect(mockedDispatchClearList).toHaveBeenCalled();
  });

  it('should call dispatchClearList on empty change', async () => {
    const mockedDispatchSearchList = jest.fn();
    const mockedDispatchClearList = jest.fn();
    const { getByLabelText } = renderWithIntl(
      <SearchListContainer
        dispatchSearchList={mockedDispatchSearchList}
        dispatchClearList={mockedDispatchClearList}
      />
    );
    fireEvent.change(getByLabelText(translate('searchBar')), {
      target: { value: 'a' }
    });
    fireEvent.click(getByLabelText(`${translate('searchBar')} ${translate('buttonText')}`));
    expect(mockedDispatchSearchList).toHaveBeenCalled();
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchSearchTermSpy = jest.fn();
    const term = 'John+Jackson';
    const actions = {
      dispatchSearchList: { term, type: trackReduxTypes.REQUEST_GET_SEARCHED_TUNES },
      dispatchClearList: { type: trackReduxTypes.CLEAR_SEARCH_LIST }
    };

    const props = mapDispatchToProps(dispatchSearchTermSpy);
    props.dispatchSearchList(term);
    expect(dispatchSearchTermSpy).toHaveBeenCalledWith(actions.dispatchSearchList);

    await timeout(500);
    props.dispatchClearList();
    expect(dispatchSearchTermSpy).toHaveBeenCalledWith(actions.dispatchClearList);
  });
});
