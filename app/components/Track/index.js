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
  top: ${(props) => (props.isPlaying ? '0px' : 'calc(100% - 46px)')};
  transition: top 200ms ease;
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
  height: calc(100% - 48px);
  display: flex;
`;

const ButtonFlex = styled.div`
  display: flex;
  height: 100%;
`;

const TitleWrapper = styled.div`
  color: white;
  font-size: 24px;
  height: 46px;
  font-weight: 500;
  padding: 6px;
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
                margin: 'calc(30% - 4px) 8px auto auto',
                height: '60px',
                width: '60px'
              }}
              aria-label={`${isPlaying ? translate('pauseText') : translate('playText')} ${translate('buttonText')}`}
              onClick={onPlayPauseClick}
            >
              <If condition={!isLoading} otherwise={<LoadingIcon />}>
                <If
                  condition={!isPlaying}
                  otherwise={<PauseCircleFilledRoundedIcon sx={{ color: 'white', fontSize: '60px' }} />}
                >
                  <PlayCircleFilledRoundedIcon sx={{ color: 'white', fontSize: '60px' }} />
                </If>
              </If>
            </IconButton>
          </InfoIconWrapper>
          <InfoIconWrapper>
            <IconButton
              sx={{
                margin: 'calc(30% - 4px) auto auto 8px',
                height: '60px',
                width: '60px'
              }}
              onClick={openTrackInfoPage}
            >
              <InfoRoundedIcon sx={{ color: 'white', fontSize: '60px' }} />
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
