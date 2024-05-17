/**
 *
 * Tests for Track
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import Track from '../index';
import { translate } from '@app/utils/index';

let mockedPlay;
let mockedStop;

jest.mock('@app/utils/audioController', () => {
  mockedPlay = jest.fn();
  mockedStop = jest.fn();

  return {
    play: (track, setLoading) => {
      setLoading(true);
      mockedPlay(track);
    },
    stop: mockedStop,
    registerAudio: jest.fn(),
  };
});

describe('<Track />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Track track={{ trackName: 'hello', artworkUrl100: 'artWork' }}/>);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render and match the snapshot when audio isPlaying', () => {
    const { baseElement } = renderWithIntl(<Track track={{ trackName: 'hello', artworkUrl100: 'artWork', trackId: 1 }} currentTrackID={1} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Track component', () => {
    const dummyTrack = { trackName: 'hello', artworkUrl100: 'artWork' };
    const { getAllByLabelText } = renderWithIntl(<Track  track={dummyTrack}/>);
    expect(getAllByLabelText(dummyTrack.trackName).length).toBe(1);
  });

  it('should call play audio on Play Button click', () => {
    const element = renderWithIntl(<Track track={{ trackName: 'hello', artworkUrl100: 'artWork', trackId: 1 }} currentTrackID={2} />);
    const playButtonEle = element.getAllByLabelText(`${translate('play_text')} ${translate('button_text')}`);
    expect(playButtonEle.length).toBe(1);
    fireEvent.click(playButtonEle[0]);
    expect(mockedPlay).toHaveBeenCalledWith({ trackName: 'hello', artworkUrl100: 'artWork', trackId: 1 });
    expect(element.getAllByLabelText(`${translate('play_text')} ${translate('button_text')}`)).toMatchSnapshot();
  });

  it('should call play audio on Pause Button click', () => {
    const element = renderWithIntl(<Track track={{ trackName: 'hello', artworkUrl100: 'artWork', trackId: 1 }} currentTrackID={1} />);
    const pauseButtonEle = element.getAllByLabelText(`${translate('pause_text')} ${translate('button_text')}`);
    expect(pauseButtonEle.length).toBe(1);
    fireEvent.click(pauseButtonEle[0]);
    expect(mockedStop).toHaveBeenCalled();
  });
});
