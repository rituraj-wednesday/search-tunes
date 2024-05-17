/**
 *
 * Track
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { If } from '../If/index';
import audioController from '@app/utils/audioController';
import Loading from '../Loading/index';
import { translate } from '@app/utils/index';

const TrackArtHoverLayer = styled.div`
  height: 100%;
  width: 100%;
  background: #000000b0;
  position: relative;
  top: ${(props) => (props.isPlaying ? '0rem' : 'calc(100% - 3rem)')};
  transition: top 200ms ease;
`;

const TrackWrapper = styled.div`
  border-radius: 0.5rem;
  border: 0.25rem solid #a88d8d;
  overflow: hidden;
  height: 12.5rem;
  width: 12.5rem;
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
  height: calc(100% - 3rem);
  display: flex;
`;

const ButtonFlex = styled.div`
  display: flex;
  height: 100%;
`;

const TitleWrapper = styled.div`
  color: white;
  font-size: 1.5rem;
  height: 3rem;
  font-weight: 500;
  padding: 0.4rem;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
`;

const LoadingSVGWrapper = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: white;
`;

const LoadingIcon = () => (
  <LoadingSVGWrapper>
    <Loading height="50px" width="50px" />
  </LoadingSVGWrapper>
);

/**
 * Track component displays track as a tile. Also displays Preview and Info button on hover.
 *
 * @date 09/05/2024 - 16:37:00
 *
 * @param {Object} props - The component props.
 * @param {string} props.track - Track data.
 * @returns {JSX.Element} The Track component.
 */
export function Track({ track, currentTrackID, onTrackInfoClick }) {
  const { trackId } = track;
  const history = useHistory();
  const isPlaying = currentTrackID === trackId;
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    audioController.registerAudio(track);
  }, [track.trackId]);

  const onPlayPauseClick = () => {
    if (!isPlaying) {
      audioController.play(track, setLoading);
    } else {
      audioController.stop();
    }
  };

  const openTrackInfoPage = () => {
    onTrackInfoClick([track]);
    setTimeout(() => {
      history.push(`/track/${trackId}`);
    }, 0);
  };

  return (
    <TrackWrapper title={track.trackName} trackArtURL={track.artworkUrl100} aria-label={track.trackName}>
      <TrackArtHoverLayer isPlaying={isPlaying}>
        <TitleWrapper>{track.trackName}</TitleWrapper>
        <ButtonFlex>
          <InfoIconWrapper>
            <IconButton
              sx={{
                margin: 'calc(30% - 0.25rem) 0.5rem auto auto',
                height: '3.75rem',
                width: '3.75rem'
              }}
              aria-label={`${isPlaying ? translate('pause_text') : translate('play_text')} ${translate('button_text')}`}
              onClick={onPlayPauseClick}
            >
              <If condition={!isLoading} otherwise={<LoadingIcon />}>
                <If
                  condition={!isPlaying}
                  otherwise={<PauseCircleFilledRoundedIcon sx={{ color: 'white', fontSize: '3.75rem' }} />}
                >
                  <PlayCircleFilledRoundedIcon sx={{ color: 'white', fontSize: '3.75rem' }} />
                </If>
              </If>
            </IconButton>
          </InfoIconWrapper>
          <InfoIconWrapper>
            <IconButton
              sx={{
                margin: 'calc(30% - 0.25rem) auto auto 0.5rem',
                height: '3.75rem',
                width: '3.75rem'
              }}
              onClick={openTrackInfoPage}
            >
              <InfoRoundedIcon sx={{ color: 'white', fontSize: '3.75rem' }} />
            </IconButton>
          </InfoIconWrapper>
        </ButtonFlex>
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
  }),
  currentTrackID: PropTypes.number,
  onTrackInfoClick: PropTypes.func
};

Track.defaultProps = {
  track: {
    artworkUrl100: '',
    trackName: ''
  }
};

export default memo(Track);
