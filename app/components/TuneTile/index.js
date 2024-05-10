/**
 *
 * TuneTile
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';

const TrackWrapper = styled.div`
  border-radius: 4px;
  border: 3px solid #a88d8d;
  overflow: hidden;
  height: 200px;
  width: 200px;
  background-image: url(${(props) => props.trackArtURL});
  background-size: cover;
`;

/**
 * TuneTile component displays track as a tile. Also displays Preview and Info button on hover.
 *
 * @date 09/05/2024 - 16:37:00
 *
 * @param {Object} props - The component props.
 * @param {string} props.track - Track data.
 * @returns {JSX.Element} The TuneTile component.
 */
export function TuneTile({ track }) {
  return (
    <TrackWrapper trackArtURL={track.artworkUrl100} aria-label={track.trackName} data-testid="tune-tile">
      <IconButton>
        <PlayCircleFilledRoundedIcon sx={{ color: 'black' }} />
      </IconButton>
    </TrackWrapper>
  );
}

TuneTile.propTypes = {
  track: PropTypes.shape({
    artworkUrl100: PropTypes.string,
    trackName: PropTypes.string
  })
};

TuneTile.defaultProps = {
  track: {
    artworkUrl100: '',
    trackName: ''
  }
};

export default memo(TuneTile);
