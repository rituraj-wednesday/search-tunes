/**
 *
 * TrackInfo Container
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { If } from '@app/components/If';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { Card, IconButton } from '@mui/material';
import styled from '@emotion/styled';
import { trackReduxCreators } from '../TrackReduxProvider/reducer';
import { selectTrackInfo, selectLoading } from '../TrackReduxProvider/selectors';
import { trackInfoContainerSaga } from '../TrackReduxProvider/saga';
import audioController from '@app/utils/audioController';
import Loading from '@app/components/Loading/index';
import { translate } from '@app/utils/index';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import AlbumIcon from '@mui/icons-material/Album';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';

const CustomCard = styled(Card)`
  && {
    margin: 1.25rem 0;
    padding: 1rem;
    max-width: ${(props) => props.maxwidth};
  }
`;

const LoadingCard = styled(CustomCard)`
  && {
    text-align: center;
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: 16rem auto;
  width: 100%;
  height: 16rem;
`;

const BottomGradient = styled.div`
  background: linear-gradient(transparent, #000000);
  height: 4rem;
  width: 100%;
  position: relative;
  bottom: 3.5rem;
  transition: height 0.5s ease, bottom 0.5s ease;
`;

const TrackContainer = styled.div`
  height: 16rem;
  width: 16rem;
  border-radius: 0.5rem;
  border: 0.25rem solid #a88d8d;
  overflow: hidden;
  background-image: url(${(props) => props.artURL});
  background-size: cover;
  transition: filter 0.5s ease;
  :hover {
    filter: drop-shadow(3px 3px 6px black);
    ${BottomGradient} {
      height: 10rem;
      bottom: 9.5rem;
    }
  }
`;

const LoadingSVGWrapper = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: white;
`;

const EWrapper = styled.span`
  background: black;
  margin: auto 0.5rem;
  border-radius: 4px;
  width: 1rem;
  padding: 0.2rem;
  color: white;
  font-weight: 700;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const LabelWrapper = styled.span`
  font-weight: 500;
`;

const LoadingIcon = () => (
  <LoadingSVGWrapper>
    <Loading height="50px" width="50px" />
  </LoadingSVGWrapper>
);

/**
 * TrackInfo container that handles the logic for displaying track detailed infor.
 * It includes detailed information of song, artist, genre, etc.
 * It also has an ability to Play Audio.
 *
 * @returns {JSX.Element} The SearchList TrackInfo container.
 */
export function TrackInfo(props) {
  const { match, dispatchTrackID, trackInfo, loading: InfoLoading } = props;
  const {
    params: { trackId }
  } = match;
  const checkTrackID = (newTrackId) => newTrackId === +trackId;
  const [firstRender, setFirstRender] = useState(true);
  const [currentTrackID, setCurrentTrackID] = useState(audioController.currentlyPlaying);
  const [isTrackLoading, setIsTrackLoading] = useState(false);
  const isTrackPlaying = checkTrackID(currentTrackID);
  let trackData = {};
  if (trackInfo?.results && trackInfo?.results?.length >= 1) {
    trackData = trackInfo.results[0];
  }

  useEffect(() => {
    if (!InfoLoading && !checkTrackID(trackData.trackId)) {
      dispatchTrackID(trackId);
    }
  }, [trackData, InfoLoading]);

  useEffect(() => {
    if (firstRender) {
      audioController.registerAudioChangeHandlers(setCurrentTrackID);
      setFirstRender(false);
    }
  }, [firstRender]);

  const onPlayClick = () => {
    if (!isTrackPlaying) {
      audioController.play(trackData, setIsTrackLoading);
    } else {
      audioController.stop();
    }
  };

  const onDetialIconClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <If
      condition={!InfoLoading}
      otherwise={
        <LoadingCard>
          <Loading height="100px" width="100px" />
        </LoadingCard>
      }
    >
      <CustomCard>
        <DetailsGrid>
          <TrackContainer artURL={trackData.artworkUrl100}>
            <IconButton
              sx={{
                margin: 'calc(100% - 4rem) auto auto calc(100% - 4rem)',
                height: '3.75rem',
                width: '3.75rem',
                zIndex: 2
              }}
              aria-label={`${isTrackPlaying ? translate('pause_text') : translate('play_text')} ${translate(
                'button_text'
              )}`}
              onClick={onPlayClick}
            >
              <If condition={!isTrackLoading} otherwise={<LoadingIcon />}>
                <If
                  condition={!isTrackPlaying}
                  otherwise={<PauseCircleFilledRoundedIcon sx={{ color: 'white', fontSize: '3.75rem' }} />}
                >
                  <PlayCircleFilledRoundedIcon sx={{ color: 'white', fontSize: '3.75rem' }} />
                </If>
              </If>
            </IconButton>
            <BottomGradient />
          </TrackContainer>
          <div>
            <div>
              <LabelWrapper>Song Name: </LabelWrapper>
              {trackData.trackName}
              <If condition={trackData?.contentAdvisoryRating === 'Explicit'}>
                <EWrapper>E</EWrapper>
              </If>
            </div>
            <div>
              <LabelWrapper>Artist Name: </LabelWrapper>
              {trackData.artistName}
            </div>
            <div>
              <LabelWrapper>Genre: </LabelWrapper>
              {trackData.primaryGenreName}
            </div>
            <div>
              <LabelWrapper>Country: </LabelWrapper>
              {trackData.country}
            </div>
            <div>
              <LabelWrapper>Price: </LabelWrapper>
              {trackData.trackPrice}
              <LabelWrapper> {trackData.currency}</LabelWrapper>
            </div>
            <div>
              <LabelWrapper>Album Name: </LabelWrapper>
              {trackData.collectionName}
              <If condition={trackData.collectionExplicitness === 'explicit'}>
                <EWrapper>E</EWrapper>
              </If>
            </div>
            <div>
              <LabelWrapper>Album Price: </LabelWrapper>
              {trackData.collectionPrice}
              <LabelWrapper> {trackData.currency}</LabelWrapper>
            </div>
            <div>
              <LabelWrapper>Release Data: </LabelWrapper>
              {new Date(trackData.releaseDate).toDateString()}
            </div>
            <ButtonContainer>
              <IconButton onClick={() => onDetialIconClick(trackData.trackViewUrl)}>
                <MusicNoteIcon />
              </IconButton>
              <IconButton onClick={() => onDetialIconClick(trackData.collectionViewUrl)}>
                <AlbumIcon />
              </IconButton>
              <IconButton onClick={() => onDetialIconClick(trackData.artistViewUrl)}>
                <MicExternalOnIcon />
              </IconButton>
            </ButtonContainer>
          </div>
        </DetailsGrid>
      </CustomCard>
    </If>
  );
}

TrackInfo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }),
  trackInfo: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  loading: PropTypes.bool,
  dispatchTrackID: PropTypes.func
};

TrackInfo.defaultProps = {
  dispatchTrackID: () => {}
};

const mapStateToProps = createStructuredSelector({
  trackInfo: selectTrackInfo(),
  loading: selectLoading()
});

// eslint-disable-next-line require-jsdoc
function mapDispatchToProps(dispatch) {
  const { requestGetTrackInfo } = trackReduxCreators;
  return {
    dispatchTrackID: (trackId) => dispatch(requestGetTrackInfo(trackId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  injectSaga({ key: 'trackReduxProvider', saga: trackInfoContainerSaga })
)(TrackInfo);

export const TrackInfoTest = compose()(TrackInfo);
