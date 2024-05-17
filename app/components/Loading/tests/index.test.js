/**
 *
 * Tests for Loading
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import Loading from '../index';

describe('<Loading />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Loading />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Loading component', () => {
    const { getAllByLabelText } = renderWithIntl(<Loading />);
    expect(getAllByLabelText('loading').length).toBe(1);
  });
});
