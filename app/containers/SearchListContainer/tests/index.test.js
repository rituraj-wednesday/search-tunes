/**
 *
 * Tests for SearchListContainer container
 *
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { timeout, renderWithIntl } from '@utils/testUtils';
import { SearchListContainerTest as SearchListContainer } from '../index';
import { translate } from '@app/utils/index';

jest.mock('react-redux', () => {
  return {
    connect: () => (comp) => comp,
  }
})

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
});
