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
import { trackReduxCreators } from '../TrackReduxProvider/reducer';
import { selectTrackInfo } from '../TrackReduxProvider/selectors';
import { trackInfoContainerSaga } from '../TrackReduxProvider/saga';
import audioController from '@app/utils/audioController';
import Loading from '@app/components/Loading/index';

/**
 * TrackInfo container that handles the logic for displaying track detailed infor.
 * It includes detailed information of song, artist, genre, etc.
 * It also has an ability to Play Audio.
 *
 * @returns {JSX.Element} The SearchList TrackInfo container.
 */
export function TrackInfo(props) {
  const { match, dispatchTrackID, trackInfo } = props;
  const {
    params: { trackId }
  } = match;
  const checkIfTrackIsPlaying = (newTrackId) => newTrackId === +trackId;
  const [firstRender, setFirstRender] = useState(true);
  const [isTrackPlaying, setIsTrackPlaying] = useState(checkIfTrackIsPlaying(audioController.currentlyPlaying));
  const [isTrackLoading, setIsTrackLoading] = useState(false);
  let trackData = {};
  if (trackInfo?.results && trackInfo?.results?.length >= 1) {
    trackData = trackInfo.results[0];
  }

  useEffect(() => {
    dispatchTrackID(trackId);
  }, []);

  useEffect(() => {
    if (firstRender) {
      audioController.registerAudioChangeHandlers((id) => setIsTrackPlaying(checkIfTrackIsPlaying(id)));
      setFirstRender(true);
    }
  }, [firstRender]);

  const onPlayClick = () => {
    if (!isTrackPlaying) {
      audioController.play(trackData, setIsTrackLoading);
    } else {
      audioController.stop();
    }
  };

  return (
    <div>
      <If condition={!isTrackLoading} otherwise={<Loading />}>
        <button onClick={onPlayClick}>{!isTrackPlaying ? 'Play' : 'Pause'}</button>
      </If>
    </div>
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
  dispatchTrackID: PropTypes.func
};

TrackInfo.defaultProps = {
  dispatchTrackID: () => {}
};

const mapStateToProps = createStructuredSelector({
  trackInfo: selectTrackInfo()
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
