/**
 *
 * Tests for Track
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import Track from '../index';

describe('<Track />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Track track={{ trackName: 'hello', artworkUrl100: 'artWork' }}/>);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TuneTile component', () => {
    const dummyTrack = { trackName: 'hello', artworkUrl100: 'artWork' };
    const { getAllByLabelText } = renderWithIntl(<Track  track={dummyTrack}/>);
    expect(getAllByLabelText(dummyTrack.trackName).length).toBe(1);
  });
});