/**
 *
 * Tests for SearchListContainer container
 *
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom';
import { renderProvider } from '@utils/testUtils';
import { SearchListContainerTest as SearchListContainer } from '../index';

describe('<SearchListContainer /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<SearchListContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
