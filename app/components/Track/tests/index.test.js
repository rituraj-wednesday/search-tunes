/**
 *
 * Tests for Track
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom'
import { renderWithIntl, timeout } from '@utils/testUtils';
import Track from '../index';

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

let mockedHistoryPush;

jest.mock('react-router-dom', () => {
  mockedHistoryPush = jest.fn();
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
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
    let playButtonEle = element.getAllByRole('button');
    if (playButtonEle && playButtonEle.length >= 1) {
      playButtonEle = playButtonEle[0];
    }
    expect(playButtonEle).toBeInTheDocument();
    fireEvent.click(playButtonEle);
    expect(mockedPlay).toHaveBeenCalledWith({ trackName: 'hello', artworkUrl100: 'artWork', trackId: 1 });
    expect(playButtonEle).toMatchSnapshot();
  });

  it('should call play audio on Pause Button click', () => {
    const element = renderWithIntl(<Track track={{ trackName: 'hello', artworkUrl100: 'artWork', trackId: 1 }} currentTrackID={1} />);
    let pauseButtonEle = element.getAllByRole('button');
    if (pauseButtonEle && pauseButtonEle.length >= 1) {
      pauseButtonEle = pauseButtonEle[0];
    }
    expect(pauseButtonEle).toBeInTheDocument();
    fireEvent.click(pauseButtonEle);
    expect(mockedStop).toHaveBeenCalled();
  });

  it('should call play audio on Info Button click', async () => {
    const tempTrack = { trackName: 'hello', artworkUrl100: 'artWork', trackId: 1 };
    const element = renderWithIntl(<Track track={tempTrack} currentTrackID={1} />);
    let infoButtonEle = element.getAllByRole('button');
    if (infoButtonEle && infoButtonEle.length >= 2) {
      infoButtonEle = infoButtonEle[1];
    }
    expect(infoButtonEle).toBeInTheDocument();
    fireEvent.click(infoButtonEle);
    await timeout(0);
    expect(mockedHistoryPush).toHaveBeenCalledWith(`/track/${tempTrack.trackId}`);
  });
});
