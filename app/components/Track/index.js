/**
 *
 * Track
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { If } from '../If/index';
import audioController from '@app/utils/audioController';

const TrackArtHoverLayer = styled.div`
  height: 100%;
  width: 100%;
  background: #000000b0;
  position: relative;
  top: 200px;
  transition: top 200ms ease;
  display: flex;
`;

const TrackWrapper = styled.div`
  border-radius: 4px;
  border: 3px solid #a88d8d;
  overflow: hidden;
  height: 200px;
  width: 200px;
  background-image: url(${(props) => props.trackArtURL});
  background-size: cover;

  :hover {
    ${TrackArtHoverLayer} {
      top: 0;
    }
  }
`;

const InfoIconWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
`;

const isPlaying = false;

/**
 * Track component displays track as a tile. Also displays Preview and Info button on hover.
 *
 * @date 09/05/2024 - 16:37:00
 *
 * @param {Object} props - The component props.
 * @param {string} props.track - Track data.
 * @returns {JSX.Element} The Track component.
 */
export function Track({ track }) {
  useEffect(() => {
    audioController.registerAudio(track.trackId, track.previewUrl, track);
  }, [track.trackId]);
  return (
    <TrackWrapper trackArtURL={track.artworkUrl100} aria-label={track.trackName} data-testid="tune-tile">
      <TrackArtHoverLayer>
        <InfoIconWrapper>
          <IconButton
            sx={{
              margin: 'auto 8px auto auto',
              height: '60px',
              width: '60px'
            }}
            onClick={() => {
              audioController.play(track);
            }}
          >
            <If
              condition={!isPlaying}
              otherwise={<PauseCircleFilledRoundedIcon sx={{ color: 'white', fontSize: '60px' }} />}
            >
              <PlayCircleFilledRoundedIcon sx={{ color: 'white', fontSize: '60px' }} />
            </If>
          </IconButton>
        </InfoIconWrapper>
        <InfoIconWrapper>
          <IconButton
            sx={{
              margin: 'auto auto auto 8px',
              height: '60px',
              width: '60px'
            }}
          >
            <InfoRoundedIcon sx={{ color: 'white', fontSize: '60px' }} />
          </IconButton>
        </InfoIconWrapper>
      </TrackArtHoverLayer>
    </TrackWrapper>
  );
}

Track.propTypes = {
  track: PropTypes.shape({
    artworkUrl100: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
    previewUrl: PropTypes.string
  })
};

Track.defaultProps = {
  track: {
    artworkUrl100: '',
    trackName: ''
  }
};

export default memo(Track);
