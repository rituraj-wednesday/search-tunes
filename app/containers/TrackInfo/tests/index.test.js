/**
 *
 * Tests for TrackInfo container
 *
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderProvider, timeout } from '@utils/testUtils';
import { TrackInfoTest as TrackInfo } from '../index';
import audioController from '@app/utils/audioController';

const tempTrack = {
  "wrapperType": "track",
  "kind": "song",
  "artistId": 889780,
  "collectionId": 945562992,
  "trackId": 945568999,
  "artistName": "Red Hot Chili Peppers",
  "collectionName": "Stadium Arcadium",
  "trackName": "Snow (Hey Oh)",
  "collectionCensoredName": "Stadium Arcadium",
  "trackCensoredName": "Snow (Hey Oh)",
  "artistViewUrl": "https://music.apple.com/us/artist/red-hot-chili-peppers/889780?uo=4",
  "collectionViewUrl": "https://music.apple.com/us/album/snow-hey-oh/945562992?i=945568999&uo=4",
  "trackViewUrl": "https://music.apple.com/us/album/snow-hey-oh/945562992?i=945568999&uo=4",
  "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/01/b5/dc/01b5dcf1-78ec-6e87-aada-788357db4ac7/mzaf_17536793983647767978.plus.aac.p.m4a",
  "artworkUrl30": "https://is1-ssl.mzstatic.com/image/thumb/Music5/v4/5e/49/35/5e493511-d87b-5aa2-b379-30fffbae902b/093624932154.jpg/30x30bb.jpg",
  "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Music5/v4/5e/49/35/5e493511-d87b-5aa2-b379-30fffbae902b/093624932154.jpg/60x60bb.jpg",
  "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music5/v4/5e/49/35/5e493511-d87b-5aa2-b379-30fffbae902b/093624932154.jpg/100x100bb.jpg",
  "collectionPrice": 14.99,
  "trackPrice": 1.29,
  "releaseDate": "2006-05-09T07:00:00Z",
  "collectionExplicitness": "notExplicit",
  "trackExplicitness": "notExplicit",
  "discCount": 1,
  "discNumber": 1,
  "trackCount": 28,
  "trackNumber": 2,
  "trackTimeMillis": 334642,
  "country": "USA",
  "currency": "USD",
  "primaryGenreName": "Alternative",
  "isStreamable": true
};

describe('<TrackInfo /> container tests', () => {
  it('should render when trackInfo is loading and match the snapshot', () => {
    const { baseElement, debug } = renderProvider(<TrackInfo match={{params: { trackId: tempTrack.trackId }}} loading />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should render when trackInfo is loaded and match the snapshot', () => {
    const { baseElement, rerender } = renderProvider(
    <TrackInfo
      match={{params: { trackId: tempTrack.trackId }}}
      loading={false}
      trackInfo={{
        results: [tempTrack],
        resultCount: 1,
      }}
    />
    );
    expect(baseElement).toMatchSnapshot();
    audioController.currentlyPlaying = tempTrack.trackId;
    rerender();
    expect(baseElement).toMatchSnapshot();
  });

  it('should call Play, Load and Pause on play button click', async () => {
    audioController.currentlyPlaying = null;
    const element = renderProvider(
      <TrackInfo
        match={{params: { trackId: tempTrack.trackId }}}
        loading={false}
        trackInfo={{
          results: [tempTrack],
          resultCount: 1,
        }}
      />
    );
    audioController.registerAudio(tempTrack);
    const currAudio = audioController.audioData[tempTrack.trackId].audio;
    currAudio.load = jest.fn();
    currAudio.play = jest.fn();
    currAudio.pause = jest.fn();

    const playButton = element.getAllByRole('button')[0];
    fireEvent.click(playButton);
    currAudio.onloadeddata();
    await timeout(0);
    expect(currAudio.play).toHaveBeenCalled();
    await timeout(0);
    const pauseButton = element.getAllByRole('button')[0];
    fireEvent.click(pauseButton);
    expect(currAudio.pause).toHaveBeenCalled();
  });

  it('should open New Tab for iTunes Preview', () => {
    const element = renderProvider(
      <TrackInfo
        match={{params: { trackId: tempTrack.trackId }}}
        loading={false}
        trackInfo={{
          results: [tempTrack],
          resultCount: 1,
        }}
      />
    );
    const buttons = element.getAllByRole('button');
    const songButton = buttons[1];
    const albumButton = buttons[2];
    const artistButton = buttons[3];
    window.open = jest.fn();
    expect(songButton).toBeInTheDocument();
    fireEvent.click(songButton);
    expect(window.open).toHaveBeenCalledWith(tempTrack.trackViewUrl, '_blank');


    window.open = jest.fn();
    expect(albumButton).toBeInTheDocument();
    fireEvent.click(albumButton);
    expect(window.open).toHaveBeenCalledWith(tempTrack.collectionViewUrl, '_blank');


    window.open = jest.fn();
    expect(artistButton).toBeInTheDocument();
    fireEvent.click(artistButton);
    expect(window.open).toHaveBeenCalledWith(tempTrack.artistViewUrl, '_blank');
  })
});
